import { Card, Typography } from "antd";
import type { ReactNode } from "react";

const { Title } = Typography;

interface AuthLayoutProps {
  children: ReactNode;
  description?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  description = "",
}) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
        padding: "20px",
      }}
    >
      <Card
        bordered={false}
        style={{
          width: 500,
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        {description && (
          <Title level={3} style={{ marginBottom: 20 }}>
            {description}
          </Title>
        )}
        {children}
      </Card>
    </div>
  );
};