import Image from 'next/image';
import images from '@/assets';

function FooterLogo() {
    return (
        <div>
            <Image src={images.logo2} alt="DOGOTRIEU" />
        </div>
    );
}

export default FooterLogo;
