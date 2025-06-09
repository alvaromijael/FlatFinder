import { Button, Typography } from "antd";
import "./HomePage.css";

const { Title, Paragraph } = Typography;

export const WelcomePage = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <Title level={1} className="gradient-text">
          Encuentra y Renta
          <br />
          El Departamento de tus sueños
        </Title>
        <Paragraph className="home-description">
          Explora nuestra selección de los mejores apartamentos en toda la ciudad 
          y encuentra tu hogar urbano ideal. 
        </Paragraph>
        <Button type="primary" size="large"> 
          Busca el tuyo
        </Button>
      </div>
      <div className="home-image">
        <img src="/login1.jpg" alt="FlatFinder banner" />
      </div>
    </div>
  );
};