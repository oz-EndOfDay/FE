"use client";

import React from "react";
import Image from "next/image";

interface ProfileCardProps {
    profileImage: string;
    name: string;
    statusMessage: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({profileImage, name, statusMessage}) => {
    return (
        <div className="flex items-center space-x-3">
            <div className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] relative">
                <Image
                    src={profileImage}
                    alt={`${name} 프로필`}
                    fill
                    className="rounded-full object-cover"
                />
            </div>
            <div>
                <div className="font-semibold">{name}</div>
                <div className="text-gray-500 text-sm">{statusMessage}</div>
            </div>
        </div>
    );
};

export default ProfileCard;
