import { LockOutlined, MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const { Title, Text } = Typography;

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogleContext } = useAuthContext();

  const onFinish = async (values: LoginFormData) => {
    try {
      const user = await login(values.email, values.password);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error al iniciar sesión: mascadores", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogleContext();
      if (user) navigate("/", { replace: true });
    } catch (error) {
      console.error("Error con login de Google:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <Card
        title={
          <Title level={3} style={{ marginBottom: 0 }}>
            Iniciar Sesión
          </Title>
        }
        bordered={false}
        style={{
          width: 400,
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Correo electrónico"
            name="email"
            rules={[
              { required: true, message: "Por favor ingresa tu correo" },
              { type: "email", message: "Correo inválido" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="correo@mail.com" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              { required: true, message: "Por favor ingresa tu contraseña" },
              { min: 6, message: "Debe tener al menos 6 caracteres" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="" />
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button type="primary" htmlType="submit" block>
                Iniciar sesión
              </Button>
              <Button
                icon={<GoogleOutlined />}
                onClick={handleGoogleLogin}
                block
              >
                Iniciar con Google
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <Text style={{ display: "block", textAlign: "center" }}>
          ¿No tienes cuenta?{" "}
          <Link to="/auth/register" style={{ fontWeight: 500 }}>
            Regístrate
          </Link>
        </Text>
      </Card>
    </div>
  );
};