import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Table } from '@mui/material';
import { operatorService } from '../../services/operatorService';

const OperatorDetail = () => {
  const { operatorId } = useParams();
  const [operator, setOperator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOperatorDetail = async () => {
      try {
        const data = await operatorService.getOperatorId(operatorId);
        setOperator(data);
      } catch (err) {
        setError('Error fetching operator details');
      } finally {
        setLoading(false);
      }
    };

    fetchOperatorDetail();
  }, [operatorId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <h2>Detalle del Operador</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Table>
                <tbody>
                  <tr>
                    <th>Nombre:</th>
                    <td>{operator.legalName}</td>
                  </tr>
                  <tr>
                    <th>Nombre Comercial:</th>
                    <td>{operator.businessName}</td>
                  </tr>
                  <tr>
                    <th>Actividad Comercial:</th>
                    <td>{operator.businessActivity}</td>
                  </tr>
                  {operator.phones.map((phone, index) => (
                    <tr key={`phones-${index}`}>
                      <th>{phone.type}:</th>
                      <td>{phone.number}</td>
                    </tr>
                  ))}
                  <tr>
                    <th>Mail:</th>
                    <td>{operator.email}</td>
                  </tr>
                  <tr>
                    <th>Operador:</th>
                    <td>{operator.operator}</td>
                  </tr>
                  
                </tbody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OperatorDetail;
