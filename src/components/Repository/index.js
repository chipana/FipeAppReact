import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Intl from 'react-native-intl';

import {
  Container,
  Name,
  Description,
  Stats,
  Stat,
  StatCount,
  Refresh,
  RefreshText,
  CurrencyText,
} from './styles';

const numberFormat = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

export default function Repository({data, onRefresh}) {
  return (
    <Container>
      <Name>
        {data.trademark} {data.model}
      </Name>
      <Description>
        {data.modelYear} {data.fuel}
      </Description>
      <Stats>
        <Stat>
          <MaterialIcon name="currency-brl" size={16} color="#333" />
          <StatCount>{numberFormat(data.value)}</StatCount>
        </Stat>
        <Stat>
          <MaterialIcon name="calendar-month" size={16} color="#333" />
          <StatCount>{data.reference}</StatCount>
        </Stat>
      </Stats>

      <Refresh onPress={onRefresh}>
        <MaterialIcon name="restore-clock" color="#7159c1" size={16} />
        <RefreshText>ATUALIZAR</RefreshText>
      </Refresh>
    </Container>
  );
}