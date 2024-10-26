import { Link } from 'react-router-dom';

const Menu =  ({ nivel }) => {
    return (
        <section className='m-auto w-full h-full bg-orange-500 flex flex-col justify-center gap-40 font-press-start'>
            <h1 className="mx-auto text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-500">
                Words of wonders
            </h1>
            <Link to={`/tablero/${nivel}`} className='mx-auto font-press-start'>
                <button className="mx-auto text-3xl font-semibold font-press-start">
                    <span className='shadow-standard-shadow text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-500 blink '>
                        {`Nivel `+ nivel}
                    </span>
                </button>
            </Link>
        </section>
    )
}

export default Menu;