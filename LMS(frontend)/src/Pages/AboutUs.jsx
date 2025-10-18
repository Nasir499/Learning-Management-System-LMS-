import HomeLayout from '../Layouts/HomeLayout'
import aboutMainImage from "../Assets/aboutMainImage.png"
import apj from "../Assets/apj.png"
import billGates from "../Assets/billGates.png"
import einstein from "../Assets/einstein.png"
import nelsonMandela from "../Assets/nelsonMandela.png"
import steveJobs from "../Assets/steveJobs.png"
function AboutUs() {
    return (
        <HomeLayout>
            <div className='pl-20 pt-20 flex flex-col text-white'>
                        <div className='flex items-center gap-5 mx-10'>
                            <section className='w-1/2 space-y-10'>
                                <h1 className='text-5xl text-yellow-500 font-semibold'>
                                    Affordable and Quality Education
                                </h1>
                                <p className='text-xl text-gray-200'>
                                    Our goal is to provide Affordable and Quality Education to the world.
                                    we are providing platform to the aspiring teachers and students to share
                                    their skills,creativity and knowledge to each other to empower and contribute
                                    in the growth and wellness of mankind.
                                </p>
                            </section>

                            <div className='w-1/2'>
                                <img
                                    src={aboutMainImage}
                                    className='drop-shadow-2xl '
                                    id='test1'
                                    style={{
                                        filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"
                                    }}
                                />

                            </div>

                        </div>

                <div className="carousel w-1/2 m-auto my-auto mx-auto">
                        <div id="item1" className="carousel-item w-full">
                            <div className='flex flex-col items-center justify-center gap-4 px-[20%]'>
                                <img
                                    src={apj}
                                    className="w-50 rounded-full border-2 border-gray-400" />
                                <p className='text-gray-200'>The best brains of the nation may be found on the last benches of the classroom.</p>
                                <h3 className='text-lg font-semibold'>A.P.J. Abdul Kalam</h3>
                            </div>
                        </div>
                        <div id="item2" className="carousel-item w-full">
                            <div className='flex flex-col items-center justify-center gap-4 px-[20%]'>
                                <img
                                    src={steveJobs}
                                    className="w-50 rounded-full border-2 border-gray-400" />
                                <p className='text-gray-200'>Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.</p>
                                <h3 className='text-lg font-semibold'>Steve Jobs</h3>
                            </div>
                        </div>
                        <div id="item3" className="carousel-item w-full">
                            <div className='flex flex-col items-center justify-center gap-4 px-[20%]'>
                                <img
                                    src={einstein}
                                    className="w-50 rounded-full border-2 border-gray-400" />
                                <p className='text-gray-200'>Imagination is more important than knowledge.</p>
                                <h3 className='text-lg font-semibold'>Albert Einstein</h3>
                            </div>
                        </div>
                        <div id="item4" className="carousel-item w-full">
                            <div className='flex flex-col items-center justify-center gap-4 px-[20%]'>
                                <img
                                    src={billGates}
                                    className="w-50 rounded-full border-2 border-gray-400" />
                                <p className='text-gray-200'>It's fine to celebrate success but it is more important to heed the lessons of failure.</p>
                                <h3 className='text-lg font-semibold'>Bill Gates</h3>
                            </div>
                        </div>
                        <div id="item5" className="carousel-item w-full">
                        <div className='flex flex-col items-center justify-center gap-4 px-[30%]'>
                            <img
                                src={nelsonMandela}
                                className="w-50 rounded-full border-2 border-gray-400" />
                            <p className='text-gray-200'>It always seems impossible until it is done.</p>
                            <h3 className='text-lg font-semibold'>Nelson Mandela</h3>
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-center gap-1 py-2">
                        <a href="#item1" className="btn btn-xs">1</a>
                        <a href="#item2" className="btn btn-xs">2</a>
                        <a href="#item3" className="btn btn-xs">3</a>
                        <a href="#item4" className="btn btn-xs">4</a>
                        <a href="#item5" className="btn btn-xs">5</a>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs
