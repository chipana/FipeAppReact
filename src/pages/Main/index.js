import React, {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import getRealm from '~/services/realm';

import Repository from '~/components/Repository';

import {
  Container,
  Title,
  Form,
  Input,
  Submit,
  List,
  DropDownMenuVehicles,
} from './styles';
//import DropdownMenu from 'react-native-dropdown-menu';

export default function Main() {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const VehicleTypes = [['Carro', 'Moto', 'Caminhão']];

  useEffect(() => {
    async function loadRepositories() {
      const realm = await getRealm();

      console.tron.log(realm.path);

      const data = realm.objects('Repository').sorted('stars', true);

      setRepositories(data);
    }

    loadRepositories();
  }, []);

  async function saveRepository(repository) {
    const data = {
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    };

    const realm = await getRealm();

    realm.write(() => {
      realm.create('Repository', data, 'modified');
    });

    return data;
  }

  async function handleAddRepository() {
    try {
      const response = await api.get(`/repos/${input}`);

      await saveRepository(response.data);

      setInput('');
      setError(false);
      Keyboard.dismiss();
    } catch (err) {
      setError(true);
    }
  }

  async function handleRefreshRepository(repository) {
    const response = await api.get(`/repos/${repository.fullName}`);

    const data = await saveRepository(response.data);

    setRepositories(
      repositories.map(repo => (repo.id === data.id ? data : repo)),
    );
  }

  return (
    <Container>
      {/* <Title>Veículos</Title> */}
      <Form>
        <DropDownMenuVehicles
          data={VehicleTypes}
          bgColor={'transparent'}
          tintColor={'#FFF'}
          activityTintColor={'#7159c1'}
          size={500}
        />
        <Input
          value={input}
          error={error}
          onChangeText={setInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Procurar veículo..."
        />
        <Submit onPress={handleAddRepository}>
          <Icon name="add" size={22} color="#FFF" />
        </Submit>
      </Form>

      <List
        keyboardShouldPersistTaps="handled"
        data={[
          {
            id: 1,
            value: 21685.05,
            trademark: 'Peugeot',
            model: '207 XS 1.6 Flex 16V 5p',
            modelYear: 2012,
            code: '024150-4',
            reference: 'JAN 2020',
            fuel: 'G',
          }
        ]}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Repository
            data={item}
            onRefresh={() => handleRefreshRepository(item)}
          />
        )}
      />
    </Container>
  );
}
