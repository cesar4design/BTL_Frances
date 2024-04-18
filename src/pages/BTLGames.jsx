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


export default function BTLLeague() {
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

                <section id='BTLGames' className='BTLSection'>
                    <h1 className='SubtitleBg'>Prévente BTL : Tirage spécial</h1>
                    <div className='twoColumns'>
                        <div className='imgColumn'>
                            <img src="sorteoEspecial.PNG" alt="" />
                        </div>
                        <div className='textColumn'>
                            <p className='Text'>
                                <h3 className='yellow negrita'>When a Lambo...? Gagnez un Lambo</h3>
                                Les billets pour le premier tirage seront obtenus lors de la prévente du jeton BTL qui aura lieu sur le site officiel de Bitlambo (bitlambo.org).
                                <br /><br />
                                La prévente du jeton BTL durera 10 semaines. BTL commencera à un prix de 0,12999 $USDT et augmentera de 0,01 $USDT chaque semaine jusqu'à atteindre le prix de 0,22999 USD à la dixième semaine.
                                <br /><br />
                                Parallèlement à la prévente, il y aura deux barres de progression pour les prix correspondants, qui devront être remplies pour favoriser la viabilité du tirage. Une fois remplies, le tirage au sort aura lieu.
                                <br /><br />
                                Pour participer au tirage au sort, vous devez d'abord vous inscrire en tant que membre de Bitlambo. Une fois inscrit, investissez dans le jeton BTL et vous obtiendrez automatiquement vos billets NFT.
                                <br /><br />
                                Connectez votre portefeuille préféré à notre prévente. Utilisez des $USDT pour acheter des BTL avec une contribution minimale de 20 $USDT et maximale de 2 000 $USDT. Pour chaque tranche de 20 $USDT investis dans la prévente de BTL, vous obtiendrez 1 billet pour le premier tirage, avec un maximum de 100 billets.
                                <br /><br />
                                N'oubliez pas de devenir membre avec un rang pour multiplier vos billets.
                                <br /><br />
                                Les prix pour le premier tirage seront :
                                <br /><br />
                                <span className='yellow negrita'>1er prix Lamborghini Huracán (ou sa valeur en BTC) <br />
                                    2e prix 1 BTC.</span>
                                <br /><br />
                                Une fois la prévente du jeton BTL terminée et le tirage au sort effectué, les membres gagnants seront vérifiés et recevront les prix correspondants.
                            </p>
                            <Link href="./"> <button className='ActionButton'>Participer au tirage au sort</button></Link>
                        </div>
                    </div>
                </section>

                <section id='BTLGames' className='BTLSection'>
                    <h1 className='SubtitleBg'>Boîte mystère</h1>
                    <div className='twoColumns'>
                        <div className='textColumn'>
                            <p className='Text'>
                                Avec un total de 9 collections différentes, les BOÎTES MYSTÈRE NFT de Bitlambo vont distribuer de grands et mystérieux prix
                                <br /><br />
                                Une fois la prévente terminée, avec la sortie du jeton $BTL sur le marché, toutes les informations pertinentes sur les boîtes mystère ainsi que les prix pouvant être remportés seront spécifiés sur le site web.
                            </p>
                        </div>
                        <div className='imgColumn'>
                            <img src="Mistery.png" alt="" />
                        </div>
                    </div>
                </section>

                <section id='BTLGames' className='BTLSection'>
                    <h1 className='SubtitleBg'>Plateforme BTL Games</h1>
                    <div className='twoColumns'>
                        <div className='imgColumn'>
                            <img src="btlGames.jpg" alt="" />
                        </div>
                        <div className='textColumn'>
                            <p className='Text'>
                                La plateforme BTL Games fera partie de l'écosystème Bitlambo et révolutionnera le concept de playtoearn (P2E). Les membres pourront jouer entre eux, créer des modes de jeu et des parties auxquelles ils pourront inviter d'autres membres à jouer. En plus de pouvoir participer aux différents défis et compétitions. La plateforme BTL Games, qui sera lancée à la fin de cette année 2024, rendra le jeton BTL indispensable au bon fonctionnement de l'écosystème Bitlambo. Cela permettra à BTL d'être très utile en dehors des cycles du marché crypto. Bien sûr, nous espérons que ce bullrun propulsera le jeton BTL vers de nouveaux sommets, mais depuis l'équipe de Bitlambo, nous sommes totalement engagés dans le projet et ses membres. C'est pourquoi, avec la plateforme BTL Games, nous dévoilerons le Labyrinthe de Bitlambo, une véritable machine à générer des récompenses et des prix crypto.
                                <br /><br />
                                Plateforme BTL Games, bientôt disponible…
                            </p>
                        </div>
                    </div>
                </section>




                <br /><br />

            </body>

        </>
    );

}
