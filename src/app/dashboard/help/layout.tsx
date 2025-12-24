import styles from "@/styles/faqstyles.module.css";
import { Toaster } from "react-hot-toast";
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className={styles["faq-rich-text"]}>
			{children}
			<Toaster />
		</div>
	);
}
