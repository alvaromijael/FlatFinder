import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import "./HomePage.css";

const { Title, Paragraph } = Typography;

export const WelcomePage = () => {
  return (
    <>
      {/* Sección principal con texto + imagen */}
      <div className="home-container">
        <div className="home-content">
          <Title level={1} className="gradient-text">
            Encuentra y Renta
            <br />
            El Departamento de tus sueños
          </Title>
          <Paragraph className="home-description">
            Explora nuestra selección de los mejores apartamentos en toda la
            ciudad y encuentra tu hogar urbano ideal.
          </Paragraph>
          <Button type="primary" size="large">
            <Link to="/auth/register" style={{ color: "white", textDecoration: "none" }}>
              Busca el tuyo
            </Link>
          </Button>
        </div>

        <div className="home-image">
          <img src="/login1.jpg" alt="FlatFinder banner" />
        </div>
      </div>

      
      <div className="lifestyle-section">
        <div className="lifestyle-text">
          <Title level={2}>Descubre el estilo de vida que deseas vivir</Title>
          <Paragraph>
            En FlatFinder creamos comunidades planeadas para cada estilo de vida,
            transformando el entorno para ofrecer experiencias exclusivas, cómodas
            e innovadoras en las mejores zonas urbanas.
          </Paragraph>
          <Paragraph strong style={{ color: "#888" }}>
            Conoce nuestros casos de éxito →
          </Paragraph>
          <Button type="primary" shape="round" size="large">
            Descubre comunidades
          </Button>
        </div>

        <div className="lifestyle-gallery">
          <img src="/login4.jpg" alt="Estilo 1" />
          <img src="/login2.jpg" alt="Estilo 2" />
          <img src="/login3.jpg" alt="Estilo 3" />
        </div>
      </div>

      

    </>
  );
};
