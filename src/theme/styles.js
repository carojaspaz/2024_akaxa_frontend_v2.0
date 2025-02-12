/** @format */

import { css } from 'styled-components'

export const customStyles = css`
  .primary-class {
    background-color: #141f35;
    color: white;
    padding: 0;
    border-radius: 0;
  }
  .secondary-class {
    background-color: #ffc924;
    color: #1c1c1c;
    padding: 0;
    border-radius: 0;
  }

  /* Estilos para el wizard en horizontal */
#progress-wizard .nav-pills {
  display: flex; /* Usamos Flexbox para distribuir los elementos horizontalmente */
  justify-content: space-between; /* Espacio igual entre los pasos */
  width: 100%; /* Ocupa todo el ancho de la pantalla */
  padding: 0;
  margin: 0;
}

#progress-wizard .nav-item {
  flex: 1; /* Hace que cada item ocupe el mismo ancho */
  text-align: center; /* Centra el contenido dentro de cada paso */
  margin: 0 10px; /* Espacio entre los pasos */
}

#progress-wizard .nav-link {
  display: block;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 0; /* Eliminar bordes redondeados */
  transition: background-color 0.3s ease, transform 0.3s ease;
}

/* Número dentro del paso */
.step-number {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  padding: 8px 12px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
}

/* Resaltar el paso activo */
.nav-pills .nav-link.active-step {
  background-color: #28a745 !important; /* Color verde para el paso activo */
  border-color: #28a745 !important;
  color: white !important;
}

/* Estilo para pasos inactivos */
.nav-pills .nav-link {
  color: #6c757d;
  background-color: transparent;
  border-color: #ddd;
  font-weight: bold;
}

.nav-pills .nav-link:hover {
  background-color: #f8f9fa;
  color: #007bff;
  transform: scale(1.05);
}

/* Alineación vertical en caso de que sea necesario */
.nav-pills .nav-item {
  display: inline-block;
}

/* Barra de progreso animada */
.nav-item.active .nav-link {
  color: #fff;
  background-color: #007bff;
  transition: background-color 0.4s ease;
}

.nav-item:not(.active) .nav-link {
  color: #6c757d;
}

`

