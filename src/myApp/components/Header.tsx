import { Layout, Menu, Dropdown, Avatar, Typography, Button } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  StarOutlined,
  AppstoreOutlined,
  TeamOutlined,
  MenuOutlined, // Nuevo icono de menú para móviles
} from "@ant-design/icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../auth/context/AuthContext";


const { Header: AntHeader } = Layout;
const { Text } = Typography;

export const Header = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  const menuItems = [];

  if (user) {
    menuItems.push(
      {
        label: <Link to="/home">Inicio</Link>,
        key: "/home",
        icon: <HomeOutlined />,
      },
      {
        label: <Link to="/new-flat">Nueva Flat</Link>,
        key: "/new-flat",
        icon: <AppstoreOutlined />,
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
        label: <Link to="/profile">Mi Perfil</Link>,
        key: "/profile",
        icon: <UserOutlined />,
      },
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
        padding: "0 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        flexWrap: "wrap",
      }}
    >
    
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
  <Link to="/"> {/* Cambia "/home" por la ruta que necesites */}
    <img
      src="/logo.png"
      alt="FlatFinder"
      style={{ width: "50px", height: "50px", cursor: "pointer" }} 
    />
  </Link>
  <Text style={{ fontSize: "18px", fontWeight: 600 }}>FlatFinder</Text>
</div>


      
      <div className="menu-container">
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{ flex: 1, justifyContent: "center", borderBottom: "none" }}
          items={menuItems}
        />
      </div>

      {/* Dropdown para menú en móviles */}
      <Dropdown overlay={<Menu items={menuItems} />} trigger={["click"]}>
        <Button type="text" className="mobile-menu">
          <MenuOutlined style={{ fontSize: "20px" }} />
        </Button>
      </Dropdown>

      {/* Usuario / Login */}
      {user ? (
        <Dropdown overlay={dropdownMenu} placement="bottomRight" trigger={["click"]}>
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 10 }}>
            <Avatar icon={<UserOutlined />} />
            <Text>{user.firstName}</Text>
          </div>
        </Dropdown>
      ) : (
        <Button type="primary">
          <Link to="/auth/login" style={{ color: "#fff" }}>Iniciar sesión</Link>
        </Button>
      )}
    </AntHeader>
  );
};