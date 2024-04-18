import { useWeb3Modal } from '@web3modal/wagmi/react'
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    useDisconnect,
    useAccount,
    usePrepareContractWrite,
    usePrepareContractRead,
    useContractRead,
    useContractWrite,
    useWaitForTransaction,
} from "wagmi";

import Presale from './Presale';
import Link from 'next/link';

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";


export default function Members() {
    const { address } = useAccount();
    const { isConnected } = useAccount();
    const { open, close } = useWeb3Modal();

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => { }, []);

    return (
        <>
            <body>

                <Particles className='particles'
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={{
                        fps_limit: 60,
                        interactivity: {
                            detect_on: "canvas",
                            modes: {
                                bubble: { distance: 100, duration: 2, opacity: 1, size: 2, speed: 3 },
                                grab: { distance: 400, line_linked: { opacity: 1 } },
                                push: { particles_nb: 4 },
                                remove: { particles_nb: 2 },
                                repulse: { distance: 400, duration: 0.4 }
                            }
                        },
                        particles: {
                            color: { value: "#ffffff" },
                            move: {
                                size: true,
                                attract: { enable: false, rotateX: 600, rotateY: 600 },
                                bounce: false,
                                direction: "none",
                                enable: true,
                                out_mode: "out",
                                random: true,
                                speed: 0.10,
                                straight: false
                            },
                            number: { density: { enable: true, value_area: 800 }, value: 300 },
                            opacity: {
                                anim: { enable: true, opacity_min: 0, speed: 1, sync: false },
                                random: true,
                                value: 1
                            },
                            size: {
                                anim: { enable: false, size_min: 0.3, speed: 4, sync: false },
                                random: true,
                                value: 1
                            }
                        },
                        retina_detect: true

                    }}
                />

                <section className='Members'>
                    <span id='RangoDiamante'></span>
                    <br /><br />
                    <div className='twoColumnsRangos'>
                        <h2>Rango Diamante X5</h2>
                        <div className='twoColumnsRangosText'>
                            <div className='textColumn'>
                                <p className='Text'>
                                    Être rang Diamant signifie avoir un avantage considérable, nous espérons que vous en tirerez parti jusqu'à la fin de la saison.
                                    <br /><br />
                                    X5 pour les tickets de tirage au sort.
                                    Avec le pouvoir incroyablement multiplicateur du DIAMANT pour chaque ticket que vous obtenez, vous obtiendrez un total de 5 tickets. Ainsi, vous multipliez par 5 vos chances de gagner le grand prix ou de remporter l'un des prix secondaires. Plus vous avez de tickets, plus vous tirerez parti du Rang.
                                    <br /><br />
                                    En devenant membre, vous recevrez 1 000 points XP que vous multiplierez par 5 en devenant un Rang DIAMANT, obtenant ainsi 5 000 XP.
                                    <br /><br />
                                    5 000 XP pour devenir membre avec un rang DIAMANT multiplié par 5 vous donne un total de 25 000 XP.
                                    <br /><br />
                                    X5 en XP pour la prévente de BTL.
                                    En participant à la prévente du token BTL, vous recevrez 2 000 XP que vous multiplierez par 5 en étant membre avec un rang DIAMANT, obtenant ainsi 10 000 XP.
                                </p>
                            </div>
                            <div className='textColumn'>
                                <p className='Text'>
                                    Pour chaque ticket, vous obtiendrez 200 XP que vous multiplierez par 5 grâce au Rang DIAMANT, obtenant ainsi un total de 1 000 XP par ticket.
                                    <br /><br />
                                    X5 en XP pour les Mistery Box.
                                    Vous recevrez des points XP en fonction de la catégorie de chaque Mistery Box que vous ouvrirez. Ces XP, grâce au pouvoir du rang DIAMANT, seront multipliés par 5, vous offrant ainsi un avantage accru dans la BTL League.
                                    <br /><br />
                                    En tant qu'affilié, pour chaque nouveau membre que vous amenez dans la communauté, vous obtiendrez 500 XP que vous multiplierez par 5, ce qui vous donnera 2 500 XP.
                                </p>
                                <a href=""> <button className='ActionButton'>Acheter le rang diamant</button></a>
                            </div>
                        </div>
                    </div>

                    <span id='RangoOro'></span>
                    <br /><br />
                    <div className='twoColumnsRangos'>
                        <h2>Rango Oro X4</h2>
                        <div className='twoColumnsRangosText'>
                            <div className='textColumn'>
                                <p className='Text'>
                                    Être rang OR signifie avoir un avantage considérable, nous espérons que vous en tirerez parti jusqu'à la fin de la saison.
                                    <br /><br />
                                    X4 pour les tickets de tirage au sort.
                                    Avec le pouvoir incroyablement multiplicateur de l'OR pour chaque ticket que vous obtenez, vous obtiendrez un total de 4 tickets. Ainsi, vous multipliez par 4 vos chances de gagner le grand prix ou de remporter l'un des prix secondaires. Plus vous avez de tickets, plus vous tirerez parti du Rang.
                                    <br /><br />
                                    En devenant membre, vous recevrez 1 000 points XP que vous multiplierez par 4 en devenant un Rang OR, obtenant ainsi 4 000 XP.
                                    <br /><br />
                                    4 000 XP pour devenir membre avec un rang OR multiplié par 4 vous donne un total de 16 000 XP.
                                    <br /><br />
                                    X4 en XP pour la prévente de BTL.
                                    En participant à la prévente du token BTL, vous recevrez 2 000 XP que vous multiplierez par 4 en étant membre avec un rang OR, obtenant ainsi 8 000 XP.
                                </p>
                            </div>
                            <div className='textColumn'>
                                <p className='Text'>
                                    Pour chaque ticket, vous obtiendrez 200 XP que vous multiplierez par 4 grâce au Rang OR, obtenant ainsi un total de 800 XP par ticket.
                                    <br /><br />
                                    X4 en XP pour les Mistery Box.
                                    Vous recevrez des points XP en fonction de la catégorie de chaque Mistery Box que vous ouvrirez. Ces XP, grâce au pouvoir du rang OR, seront multipliés par 4, vous offrant ainsi un avantage accru dans la BTL League.
                                    <br /><br />
                                    En tant qu'affilié, pour chaque nouveau membre que vous amenez dans la communauté, vous obtiendrez 500 XP que vous multiplierez par 4, ce qui vous donnera 2 000 XP.
                                </p>
                                <a href=""> <button className='ActionButton'>Acheter le rang oro</button></a>
                            </div>
                        </div>
                    </div>

                    <span id='RangoPlata'></span>
                    <br /><br />
                    <div className='twoColumnsRangos'>
                        <h2>Rango Plata X3</h2>
                        <div className='twoColumnsRangosText'>
                            <div className='textColumn'>
                                <p className='Text'>
                                    Être rang PLATA signifie avoir un avantage considérable, nous espérons que vous en tirerez parti jusqu'à la fin de la saison.
                                    <br /><br />
                                    X3 pour les tickets de tirage au sort.
                                    Avec le pouvoir incroyablement multiplicateur de la PLATA pour chaque ticket que vous obtenez, vous obtiendrez un total de 3 tickets. Ainsi, vous multipliez par 3 vos chances de gagner le grand prix ou de remporter l'un des prix secondaires. Plus vous avez de tickets, plus vous tirerez parti du Rang.
                                    <br /><br />
                                    En devenant membre, vous recevrez 1 000 points XP que vous multiplierez par 3 en devenant un Rang PLATA, obtenant ainsi 3 000 XP.
                                    <br /><br />
                                    3 000 XP pour devenir membre avec un rang PLATA multiplié par 3 vous donne un total de 9 000 XP.
                                    <br /><br />
                                    X3 en XP pour la prévente de BTL.
                                    En participant à la prévente du token BTL, vous recevrez 2 000 XP que vous multiplierez par 3 en étant membre avec un rang PLATA, obtenant ainsi 6 000 XP.
                                </p>
                            </div>
                            <div className='textColumn'>
                                <p className='Text'>
                                    Pour chaque ticket, vous obtiendrez 200 XP que vous multiplierez par 3 grâce au Rang PLATA, obtenant ainsi un total de 600 XP par ticket.
                                    <br /><br />
                                    X3 en XP pour les Mistery Box.
                                    Vous recevrez des points XP en fonction de la catégorie de chaque Mistery Box que vous ouvrirez. Ces XP, grâce au pouvoir du rang PLATA, seront multipliés par 3, vous offrant ainsi un avantage accru dans la BTL League.
                                    <br /><br />
                                    En tant qu'affilié, pour chaque nouveau membre que vous amenez dans la communauté, vous obtiendrez 500 XP que vous multiplierez par 3, ce qui vous donnera 1 500 XP.
                                </p>
                                <a href=""> <button className='ActionButton'>Acheter le rang plata</button></a>
                            </div>
                        </div>
                    </div>

                    <span id='RangoBronce'></span>
                    <br /><br />
                    <div id className='twoColumnsRangos'>
                        <h2>Rango Bronze X2</h2>
                        <div className='twoColumnsRangosText'>
                            <div className='textColumn'>
                                <p className='Text'>
                                    Être rang BRONZE signifie avoir un avantage considérable, nous espérons que vous en tirerez parti jusqu'à la fin de la saison.
                                    <br /><br />
                                    X2 pour les tickets de tirage au sort.
                                    Avec le pouvoir incroyablement multiplicateur du BRONZE pour chaque ticket que vous obtenez, vous obtiendrez un total de 2 tickets. Ainsi, vous multipliez par 2 vos chances de gagner le grand prix ou de remporter l'un des prix secondaires. Plus vous avez de tickets, plus vous tirerez parti du Rang.
                                    <br /><br />
                                    En devenant membre, vous recevrez 1 000 points XP que vous multiplierez par 2 en devenant un Rang BRONZE, obtenant ainsi 2 000 XP.
                                    <br /><br />
                                    2 000 XP pour devenir membre avec un rang BRONZE multiplié par 2 vous donne un total de 4 000 XP.
                                    <br /><br />
                                    X2 en XP pour la prévente de BTL.
                                    En participant à la prévente du token BTL, vous recevrez 2 000 XP que vous multiplierez par 2 en étant membre avec un rang BRONZE, obtenant ainsi 4 000 XP.
                                </p>
                            </div>
                            <div className='textColumn'>
                                <p className='Text'>
                                    Pour chaque ticket, vous obtiendrez 200 XP que vous multiplierez par 2 grâce au Rang BRONZE, obtenant ainsi un total de 1 000 XP par ticket.
                                    <br /><br />
                                    X2 en XP pour les Mistery Box.
                                    Vous recevrez des points XP en fonction de la catégorie de chaque Mistery Box que vous ouvrirez. Ces XP, grâce au pouvoir du rang BRONZE, seront multipliés par 2, vous offrant ainsi un avantage accru dans la BTL League.
                                    <br /><br />
                                    En tant qu'affilié, pour chaque nouveau membre que vous amenez dans la communauté, vous obtiendrez 500 XP que vous multiplierez par 2, ce qui vous donnera 1 000 XP.
                                </p>
                                <a href=""> <button className='ActionButton'>Acheter le rang bronze</button></a>
                            </div>
                        </div>
                    </div>
                </section>


                <br /><br />

            </body>

        </>
    );

}
