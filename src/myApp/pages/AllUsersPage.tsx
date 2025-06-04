import { useEffect, useState } from "react";
import { Table, Typography, Select, message } from "antd";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const { Title } = Typography;
const { Option } = Select;

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin" | "superadmin";
}

export const AllUsersPage = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const data: UserData[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserData[];
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      message.error("Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id: string, newRole: "user" | "admin") => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { role: newRole });
      message.success("Rol actualizado");
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
    } catch (error) {
      console.error("Error al actualizar rol:", error);
      message.error("Error al actualizar rol");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rol",
      key: "role",
      render: (_: any, record: UserData) => {
        if (record.role === "superadmin") {
          return <span style={{ fontWeight: 600 }}>Superadmin</span>;
        }

        return (
          <Select
            defaultValue={record.role}
            onChange={(value) => handleRoleChange(record.id, value)}
            style={{ width: 120 }}
          >
            <Option value="user">Usuario</Option>
            <Option value="admin">Administrador</Option>
          </Select>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Gestión de Usuarios</Title>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default AllUsersPage;