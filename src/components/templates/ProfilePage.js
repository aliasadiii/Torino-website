"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { sendUserData } from "@/services/user";

import ProfileInfo from "@/components/modules/profile/ProfileInfo";

import styles from "@/styles/profile/ProfilePage.module.css";
import UserInfo from "../modules/profile/UserInfo";
import UserBankInfo from "../modules/profile/UserBankInfo";

function ProfilePage({ user }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const sendUserMutation = useMutation({
    mutationFn: sendUserData,
    onSuccess: (data) => {
      const userData = data.res.data.data;
      queryClient.setQueryData(["auth"], (data) => ({
        ...data,
        user: userData,
      }));
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className={styles.container}>
      <ProfileInfo user={user} sendUserMutation={sendUserMutation} />
      <div>
        <UserInfo user={user} sendUserMutation={sendUserMutation} />
      </div>
      <div>
        <UserBankInfo user={user} sendUserMutation={sendUserMutation} />
      </div>
    </div>
  );
}

export default ProfilePage;
