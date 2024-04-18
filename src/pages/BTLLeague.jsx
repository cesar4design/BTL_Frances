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

import SystemABI from "../abi/SystemABI.json";


export default function BTLLeague() {
    const { address } = useAccount();
    const { isConnected } = useAccount();
    const { open, close } = useWeb3Modal();

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => { }, []);

    // Contracts
    const [SystemContract, setSystemContract] = useState({ address: '0x4113720450864e7d9e35C3CBa7FA7e5D9C55CD27', abi: SystemABI });



    // Read rank Info
    const [data, setData] = useState({ addresses: [], points: [] });

    const { data: rankInfoData } = useContractRead({
        ...SystemContract,
        functionName: 'infoRanking',
        watch: true,
        args: [],
    });

    React.useEffect(() => {
        if (rankInfoData) {
            const [addresses, points] = rankInfoData;
            // Convertir puntos a cadenas
            const pointsAsString = points.map(point => point.toString());

            // Crear un array de objetos con direcciones y puntos
            const membersWithPoints = addresses.map((address, index) => ({
                address,
                points: pointsAsString[index]
            }));

            // Ordenar el array por puntos (en orden descendente)
            membersWithPoints.sort((a, b) => b.points - a.points);

            // Añadir el número de posición a cada objeto
            const membersWithPosition = membersWithPoints.map((member, index) => ({
                ...member,
                position: index + 1
            }));

            // Separar direcciones, puntos y posiciones ordenadas
            const sortedAddresses = membersWithPosition.map(member => member.address);
            const sortedPoints = membersWithPosition.map(member => member.points);
            const positions = membersWithPosition.map(member => member.position);

            setData({ addresses: sortedAddresses, points: sortedPoints, positions });
        }
    }, [rankInfoData]);





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

                <section className='BTLSection'>
                    <h1 className='SubtitleBg'>BTL League</h1>
                    <div className='twoColumns'>
                        <div className='imgColumn'>
                            <img src="BTLLeague.jpg" alt="" />
                        </div>
                        <div className='textColumn'>
                            <p className='Text'>
                                BITLAMBO a un système de bonus de points appelé points XP. En jouant à des jeux, en participant aux tirages, en devenant membre avec un rang, en investissant dans BTL ou en attirant plus de personnes dans la communauté, vous obtiendrez des points XP.
                                <br /><br />
                                Plus de personnes se joignent en tant que membres via vous, plus vous participez, plus vous jouez ou investissez avec BTL, et plus vous obtiendrez de points, ce qui vous permettra de vous positionner dans le classement de la BTL League.
                                <br /><br />
                                Dans le tableau des points XP ci-dessous, vous pourrez voir comment les obtenir et ainsi élaborer votre stratégie pour obtenir de meilleurs avantages et remporter les meilleurs prix.
                            </p>
                            <div className='xpBox'>
                                Nouveau membre : 500 XP
                                <br />
                                Nouveau membre avec rang : 1 000 XP
                                <br />
                                Investir dans BTL : N/D
                                <br />
                                Billet : 200 XP
                                <br />
                                Tirage : 2 000 XP
                                <br />
                                Boîte mystère : N/D
                                <br />
                                Jeux Bitlambo : N/D
                            </div>
                        </div>
                    </div>

                    <br /><br />

                    <div className='Temporadacontainer'>
                        <h2>Fin de saison</h2>
                        <p className='Text'>
                            Pendant la saison, 15 % des bénéfices du projet ont été réservés dans un portefeuille exclusif pour la BTL League. À la fin de la saison de BITLAMBO, les mieux classés dans la BTL League seront les véritables gagnants car ils se partageront les gains accumulés.
                        </p>

                        <div className='twoColumnsTemporada'>
                            <div className='textColumn'>
                                <p className='Text'>
                                    Les prix seront répartis comme suit :
                                </p>
                                <div className='xpBox'>
                                    1° Classé : 5 % des gains accumulés en BTC. <br />
                                    2° Classé : 4 % des gains accumulés en BTC. <br />
                                    3° Classé : 3 % des gains accumulés en BTC. <br />
                                    4° Classé : 2 % des gains accumulés en BTC. <br />
                                    5° Classé : 1 % des gains accumulés en BTC. <br />
                                    6° Classé : 0,5 % des gains accumulés en BTC. <br />
                                    7° Classé : 0,4 % des gains accumulés en BTC. <br />
                                    8° Classé : 0,3 % des gains accumulés en BTC. <br />
                                    9° Classé : 0,2 % des gains accumulés en BTC. <br />
                                    10° Classé : 0,1 % des gains accumulés en BTC. <br /><br />

                                    11° - 25° Classés : 10 % des gains accumulés en BTC. <br />
                                    26° - 39° Classés : 5 % des gains accumulés en BTC. <br />
                                    40° - 109° Classés : 20 % des gains accumulés en BTC. <br />
                                    110° - 259° Classés : 20 % des gains accumulés en BTC. <br />
                                    260° - 509° Classés : 15 % des gains accumulés en BTC. <br />
                                    510° - 1 000° Classés : 15 % des gains accumulés en BTC.
                                </div>
                            </div>
                            <div className='imgColumn'>
                                <img src="Temporada.png" alt="" />
                            </div>
                        </div>
                    </div>

                    <br /><br />

                    <div className='Temporadacontainer'>
                        <h2>Classement</h2>

                        <table>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Utilisateur</th>
                                    <th>Points</th>
                                </tr>

                            </thead>
                            <tbody>
                                {data.addresses.map((address, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className='addressTable'>{address}</td>
                                        <td>{data.points[index]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                </section>



                <br /><br />

            </body>

        </>
    );

}
