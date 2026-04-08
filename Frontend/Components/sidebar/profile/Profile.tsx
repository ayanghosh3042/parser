import React, { useState } from "react";
import HeaderSection from "./HeaderSection";
import Button from "../../../Design/Button";
import { LuPen, LuUser } from "react-icons/lu";
import InputField from "../../../Design/InputField";
import { toast } from "react-hot-toast";

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const Profile = () => {

  interface InfoRowProps {
    label: string;
    value: string;
    editable?: boolean;
    field?: keyof Profile;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    firstName: "Prerna",
    lastName: "Mishra",
    email: "prerna@gmail.com",
    phone: "9876543210",
  });
  const [originalProfile, setOriginalProfile] = useState(profile);

  const InfoRow = ({ label, value, field, editable }: InfoRowProps) => {
    return (
      <div className="mb-2 px-2">
        <div className="text-gray-500 text-sm">{label}</div>
        {editable ? (
          <InputField
            type="text"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProfile((prev) => ({
                ...prev,
                [field as keyof Profile]: e.target.value,
              }))
            }
          />
        ) : (
          <div className="text-black font-medium py-0.5">{value}</div>
        )}
      </div>
    );
  };

  return (
    <>

      <div className="flex flex-col w-full bg-[#101828]">
        <div className="bg-[#fbf9ff] w-full rounded-tl-3xl">

          {/* Header Banner */}
          <div className="h-[180px] rounded-tl-3xl bg-gradient-to-br from-sky-400 via-orange-300 via-pink-400 via-purple-500 via-orange-200 via-purple-400 to-pink-500" />

          {/* Profile Header */}
          <div className="flex justify-between px-8 relative z-20">
            <div className="flex items-start gap-4 -mt-4">
              <div className="h-[160px] w-[160px] rounded-full border-4 border-gray z-15 shadow-lg -translate-y-12 relative bg-white overflow-hidden">
                <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <LuUser className="w-18 h-18 text-gray-500" />
                </div>
              </div>

              <div className="-ml-40 flex flex-col justify-center my-6 mt-35">
                <div className="text-xl font-semibold text-black">
                  {profile.firstName} {profile.lastName}
                </div>
                <div className="text-gray-500">{profile.email}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-6 relative z-20">
              {isEditing ? (
                <>
                  <Button variant="primary" onClick={() => { setIsEditing(false); toast.success("Changes saved successfully!") }} className="h-9 px-4 text-sm rounded-full">
                    Save Changes
                  </Button>
                  <Button variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setProfile(originalProfile);
                    }}
                    className="h-9 px-4 text-sm rounded-full shadow-sm"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setOriginalProfile(profile);
                    setIsEditing(true);
                  }}
                  className="h-9 px-4 text-sm rounded-full flex items-center gap-2 mt-32 mr-60"
                >
                  <LuPen className="w-4 h-4" />
                  <span>Edit Profile</span>
                </Button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-4 px-60 py-0 ml-40 -mt-18">

            {/* LEFT PANEL */}
            <div className="w-full flex flex-col">
              <div className="w-full px-8 py-0">
                <div className="text-l font-500 text-black">
                  Account Information
                </div>
                <div className="text-gray-500 font-400">
                  Update your photo and personal details
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 px-60 py-10 ml-40">
            {/* RIGHT PANEL */}
            <div className="w-full mx-1 bg-white rounded-2xl shadow-md px-6 py-4 space-y-3">

              <div className="flex gap-3">
                <div className="w-full mx-10 my-2">
                  <InfoRow
                    label="Email"
                    value={profile.email}
                    editable={isEditing}
                    field="email"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-full mx-10 my-1">
                  <InfoRow
                    label="First Name"
                    value={profile.firstName}
                    editable={isEditing}
                    field="firstName"
                  />
                </div>
                <div className="w-full mx-10">
                  <InfoRow
                    label="Last Name"
                    value={profile.lastName}
                    editable={isEditing}
                    field="lastName"
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <div className="w-full mx-10 my-1">
                  <InfoRow
                    label="Display Name"
                    editable={isEditing}
                    value={`${profile.firstName} ${profile.lastName}`}
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <div className="w-full mx-10 my-1">
                  <InfoRow
                    label="Phone"
                    value={profile.phone}
                    editable={isEditing}
                    field="phone"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;