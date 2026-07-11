import Image from "next/image";
import styles from "@/styles/notFound.module.css";

const ServerError = () => {
  return (
    <main className={styles.container}>
      <div className={styles.message}>
        <h2 style={{ marginTop: "20px" }}>اتصال با سرور برقرار نیست!</h2>
        <p>لطفا بعدا دوباره امتحان کنید.</p>
      </div>
      <Image
        src="/images/ErrorLampRobot.jpg"
        width={555}
        height={555}
        alt="server-error"
      />
    </main>
  );
};

export default ServerError;
