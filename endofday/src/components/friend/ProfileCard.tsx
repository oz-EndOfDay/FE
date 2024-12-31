"use client";

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
    <div className="flex items-center space-x-4">
      <img
        src={profileImage}
        alt={`${name} 프로필`}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-gray-500 text-sm">{statusMessage}</div>
      </div>
    </div>
  );
};

export default ProfileCard;
