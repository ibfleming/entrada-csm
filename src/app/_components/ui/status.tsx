import { IconCircleFilled } from "@tabler/icons-react";

interface StatusProps {
  status: {
    online: boolean;
  };
}

export default function Status({ status }: StatusProps) {
  return (
    <IconCircleFilled
      className={`${status.online ? "online" : "offline"}`}
      width={15}
      height={15}
    />
  );
}
