
import styles from './page.module.css'
import { register } from 'swiper/element/bundle'


register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import BodyHome from "./(pages)/bodyhome/page";
import { Banner } from './components/banner/page';
import Footer from './components/footer/page';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Home() {
  return (
    <div className={styles.container}>

      <div className={styles.body_box}>
        <Banner />
        {/* <main className={styles.main}>{props.children}
        </main> */}
        <BodyHome />
      </div>
    </div>
  );
}
