import { Layout, Menu, Dropdown, Avatar, Typography, Button } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  StarOutlined,
  AppstoreOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../auth/context/AuthContext";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export const Header = () => {
  const { user, logout } = useAuthContext();
  console.log("User in Header: ", user);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  const menuItems = [];

  if (user) {
    menuItems.push(
      {
        label: <Link to="/">Inicio</Link>,
        key: "/",
        icon: <HomeOutlined />,
      },
      {
        label: <Link to="/my-flats">Mis Flats</Link>,
        key: "/my-flats",
        icon: <AppstoreOutlined />,
      },

      {
        label: <Link to="/favourites">Favoritos</Link>,
        key: "/favourites",
        icon: <StarOutlined />,
      },
      {
        label: <Link to="/profile">Mi Perfil</Link>,
        key: "/profile",
        icon: <UserOutlined />,
      }
    );
  }

  if (user?.role === "admin" || user?.role === "superadmin") {
    menuItems.push({
      label: <Link to="/all-users">Usuarios</Link>,
      key: "/all-users",
      icon: <TeamOutlined />,
    });
  }

  const dropdownMenu = (
    <Menu
      items={[
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: <span onClick={handleLogout}>Cerrar sesión</span>,
        },
      ]}
    />
  );

  return (
    <AntHeader
      style={{
        background: "#fff",
        padding: "0 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Text style={{ fontSize: "20px", fontWeight: 600 }}>🏠 FlatFinder</Text>

      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        style={{ flex: 1, justifyContent: "center", borderBottom: "none" }}
        items={menuItems}
      />

      {user ? (
        <Dropdown
          overlay={dropdownMenu}
          placement="bottomRight"
          trigger={["click"]}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 10,
            }}
          >
            <Avatar icon={<UserOutlined />} />
            <Text>{user.firstName}</Text>
          </div>
        </Dropdown>
      ) : (
        <Button type="primary">
          <Link to="/auth/login" style={{ color: "#fff" }}>
            Iniciar sesión
          </Link>
        </Button>
      )}
    </AntHeader>
  );
};