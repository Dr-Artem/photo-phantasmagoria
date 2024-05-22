import style from './Hero.module.css';

export const Hero = () => {
    return (
        <section className={style.hero}>
            <div className={style.hero__conatiner}>
                {/* <div className={style.hero__titleWrapper}> */}
                <h1 className={style.hero__title}>Photo Phantasmagoria</h1>
                <h2 className={style.hero__subtitle}>
                    The world of photography at your fingertips: tender moments
                    and breathtaking landscapes
                </h2>
                {/* </div> */}
            </div>
        </section>
    );
};
