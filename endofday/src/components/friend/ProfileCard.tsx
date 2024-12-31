import Image from "next/image";
import React from "react";

interface ProfileCardProps {
  profileImage: string;
  name: string;
  statusMessage: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
                                                   profileImage,
                                                   name,
                                                   statusMessage,
                                                 }) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Next.js 최적화 이미지 사용 */}
      <Image
        src={profileImage}
        alt={`${name} 프로필`}
        width={50}
        height={50}
        className="rounded-full object-cover"
      />
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-gray-500 text-sm">{statusMessage}</div>
      </div>
    </div>
  );
};

export default ProfileCard;
