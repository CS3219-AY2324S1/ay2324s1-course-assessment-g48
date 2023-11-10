// ParticipantsIcon.tsx
import { User } from "@/database/user/entities/user.entity";
import Image from "next/image";
import React from "react";

interface ParticipantsIconProps {
  participants: User[];
}

const ParticipantsIcon: React.FC<ParticipantsIconProps> = ({
  participants,
}) => {
  return (
    <div className="flex space-x-3 mt-3">
      {participants.map((participant, index) => {
        return (
          <div className="rounded-full overflow-auto" key={index}>
            <Image
              key={index}
              width="30"
              height="30"
              src={participant.image ?? "/avatar.svg"}
              alt={participant.image ?? "/avatar.svg"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ParticipantsIcon;
