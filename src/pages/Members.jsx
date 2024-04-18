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
import USDTABI from "../abi/USDTABI.json";


export default function Members() {
    const { address } = useAccount();
    const { isConnected } = useAccount();
    const { open, close } = useWeb3Modal();

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => { }, []);

    // Contracts
    const [SystemContract, setSystemContract] = useState({ address: '0x4113720450864e7d9e35C3CBa7FA7e5D9C55CD27', abi: SystemABI });
    const [USDTContract, setUSDTTokenAddress] = useState({ address: '0x5e1AD32700181207571B81eCAECE491C5C690cf9', abi: USDTABI });

    // NFT Aprove USDT
    const { config: ApproveUSDT } = usePrepareContractWrite({
        ...USDTContract,
        functionName: "approve",
        args: ["0x4113720450864e7d9e35C3CBa7FA7e5D9C55CD27", 500000000],
    });

    const { write: Approve, isLoading, isSuccess } = useContractWrite(ApproveUSDT);

    // Mint NFTs
    const { write: mintBronze } = useContractWrite({
        ...SystemContract,
        functionName: "mintBronze",
        args: [],
    });

    const { write: mintSilver } = useContractWrite({
        ...SystemContract,
        functionName: "mintSilver",
        args: [],
    });

    const { write: mintGold } = useContractWrite({
        ...SystemContract,
        functionName: "mintGold",
        args: [],
    });

    const { write: mintDiamond } = useContractWrite({
        ...SystemContract,
        functionName: "mintDiamond",
        args: [],
    });

    // Read level
    const [level, setLevel] = React.useState(false);

    const { data: dataLevel } = useContractRead({
        ...SystemContract,
        functionName: 'getLevel',
        args: [address],
        watch: true,
    });

    React.useEffect(() => {
        if (dataLevel !== undefined) { setLevel(dataLevel); }
    }, [dataLevel]);


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



                <section id className='Members'>
                    <h1 className='SubtitleBg'>Membres de Bitlambo</h1>
                    <div className='twoColumns'>
                        <div className='imgColumn'>
                            <img src="miembros.jpg" alt="" />
                        </div>
                        <div className='textColumn'>
                            <p className='Text'>
                                Chez Bitlambo, nous savons que nos membres sont notre ressource la plus précieuse. C'est pourquoi, dans le but de créer une communauté forte et solide, Bitlambo distribue des avantages parmi ses membres. Les rendements seront accumulés tout au long de l'année et distribués à la fin de la saison de la BTL League.
                                <br /><br />
                                Accumulez des points XP pour gravir les échelons et vous qualifier pour la finale de la BTL League.
                                <br /><br />
                                Les membres peuvent choisir leur rang parmi les éditions limitées NFT. Les rangs multiplieront leurs points XP, leur permettant ainsi de bénéficier davantage du projet. De plus, ils augmenteront leurs chances de gagner aux tirages au sort et de remporter les prix.
                                Devenez membre, choisissez votre rang, investissez dans le jeton BTL, invitez d'autres personnes à rejoindre la communauté, jouez aux jeux BTL et gagnez des Lambos et des BTC.
                            </p>
                            <a href="#Diamante"> <button className='ActionButton'>Je veux devenir membre</button></a>
                        </div>
                    </div>


                    <span id='Rangos'></span>
                    <br /><br />

                    <div className='twoColumns'>
                        <div className='textColumn'>
                            <h2>Rangs</h2>
                            <p className='Text'>
                                Il existe 4 types de rang, chacun avec ses avantages :
                                <br /><br />
                                Choisissez votre rang et multipliez vos tickets pour le tirage au sort, augmentant ainsi vos chances de gagner.
                                <br /><br />
                                Grâce au rang, les membres auront un avantage considérable. C'est pourquoi, s'ils maintiennent une bonne stratégie de participation, ils peuvent devenir des gagnants potentiels à tout moment.
                                <br /><br />
                                Le rang multipliera également vos points XP pour la BTL League, augmentant ainsi vos chances de bénéficier des avantages de Bitlambo en fin de saison.
                                <br /><br />
                                Il est évident que les membres avec un rang sont prêts à tout donner pour gagner aux jeux et aux tirages au sort, multiplier leurs XP pour monter dans la BTL League. Ils comprennent ce que Bitlambo offre et veulent s'assurer leur part du gâteau.
                                <br /><br />
                                De plus, seuls les membres avec un rang pourront ouvrir les Mistery Box exclusives des collections limitées. Vous pourrez débloquer de meilleures Mistery Box avec des prix plus élevés en cumulant vos points XP.
                                <br /><br />
                                Faites savoir que vous êtes là ! Cela vient de commencer et vous êtes déjà parmi les premiers dans la BTL League.
                            </p>
                            <a href="#Diamante"> <button className='ActionButton'>Choisir un rang</button></a>
                        </div>

                        <div className='imgColumn'>
                            <div className='RangosColumn'>
                                <img src="./rangos/Bronze.gif" alt="" />
                                <img src="./rangos/Silver.gif" alt="" />
                            </div>
                            <div className='RangosColumn'>
                                <img src="./rangos/Gold.gif" alt="" />
                                <img src="./rangos/Diamond.gif" alt="" />
                            </div>
                        </div>
                    </div>

                    <span id='Diamante'></span>
                    <br /><br />
                    <div className='twoColumns'>
                        <div className='imgColumn'>
                            <h2>Rango Diamante</h2>
                            <br />
                            <img src="rangos/Diamond.gif" alt="" />
                            <br /><br />
                            <h3>500$</h3>
                            {(level == "Bronze" || level == "Silver" || level == "Gold" || level == "Diamond") ? (
                                <>
                                    <button className="ActionButton">Ya eres miembro con rango</button>
                                </>
                            ) : (
                                <>
                                    {isSuccess ? (
                                        <>
                                            <button disabled={!isConnected} onClick={() => mintDiamond()} className="ActionButton">Confirmar compra</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => Approve?.()} className="ActionButton"> Comprar rango diamante </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                        <div className='textColumn'>
                            <div class="containero">
                                <div class="item"><div class="hexagon normalbg">XP registro x5</div></div>
                                <div class="item"><div class="hexagon normalbg">Xp miembro diamante x5</div></div>
                                <div class="item"><div class="hexagon normalbg">Xp preventa x5</div></div>
                                <div class="item"><div class="hexagon normalbg">Xp BTl x5</div></div>
                                <div class="item"><div class="hexagon normalbg">xp de sorteo x5</div></div>
                                <div class="item"><div class="hexagon yellowbg">Tickets para el sorteo x5</div></div>
                                <div class="item"><div class="hexagon normalbg">xp mistery box x5</div></div>
                                <div class="item"><div class="hexagon normalbg">xp Bitlambo Games x5</div></div>
                                <div class="item"><div class="hexagon normalbg">xp Afiliado x5</div></div>
                                <div class="item"><div class="hexagon normalbg">Máximo 300 NFTs</div></div>
                            </div>

                            <div className='RangoMore'> <Link className='MoreButton' href="MembersMore#RangoDiamante">Conocer rango diamante.</Link></div>

                        </div>
                    </div>
                    <br /><br />
                    <div className='twoColumns'>
                        <div className='imgColumn'>
                            <h2>Rango Oro</h2>
                            <br />
                            <img src="rangos/Gold.gif" alt="" />
                            <br /><br />
                            <h3>300$</h3>
                            {(level == "Bronze" || level == "Silver" || level == "Gold" || level == "Diamond") ? (
                                <>
                                    <button className="ActionButton">Ya eres miembro con rango</button>
                                </>
                            ) : (
                                <>
                                    {isSuccess ? (
                                        <>
                                            <button disabled={!isConnected} onClick={() => mintGold()} className="ActionButton">Confirmar compra</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => Approve?.()} className="ActionButton"> Comprar rango oro </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                        <div className='textColumn'>
                            <div class="containero">
                                <div class="item"><div class="hexagon normalbg">XP registro x4</div></div>
                                <div class="item"><div class="hexagon normalbg">Xp miembro diamante x4</div></div>
                                <div class="item"><div class="hexagon normalbg">Xp preventa x4</div></div>
                                <div class="item"><div class="hexagon normalbg">Xp BTl x4</div></div>
                                <div class="item"><div class="hexagon normalbg">xp de sorteo x4</div></div>
                                <div class="item"><div class="hexagon yellowbg">Tickets para el sorteo x4</div></div>
                                <div class="item"><div class="hexagon normalbg">xp mistery box x4</div></div>
                                <div class="item"><div class="hexagon normalbg">xp Bitlambo Games x4</div></div>
                                <div class="item"><div class="hexagon normalbg">xp Afiliado x4</div></div>
                                <div class="item"><div class="hexagon normalbg">Máximo 450 NFTs</div></div>
                            </div>

                            <div className='RangoMore'> <Link className='MoreButton' href="MembersMore#RangoOro">Conocer rango oro.</Link></div>

                        </div>
                    </div>
                    <br /><br />
                    <div className='twoColumns'>
                        <div className='imgColumn'>
                            <h2>Rango Plata</h2>
                            <br />
                            <img src="rangos/Silver.gif" alt="" />
                            <br /><br />
                            <h3>200$</h3>
                            {(level == "Bronze" || level == "Silver" || level == "Gold" || level == "Diamond") ? (
                                <>
                                    <button className="ActionButton">Ya eres miembro con rango</button>
                                </>
                            ) : (
                                <>
                                    {isSuccess ? (
                                        <>
                                            <button disabled={!isConnected} onClick={() => mintSilver()} className="ActionButton">Confirmar compra</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => Approve?.()} className="ActionButton"> Comprar rango plata </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                        <div className='textColumn'>
                            <div class="containero">
                                <div class="item"><div class="hexagon normalbg">XP registro x3</div></div>
                                <div class="item"><div class="hexagon normalbg">Xp miembro diamante x3</div></div>
                                <div class="item"><div class="hexagon normalbg">Xp preventa x3</div></div>
                                <div class="item"><div class="hexagon normalbg">Xp BTl x3</div></div>
                                <div class="item"><div class="hexagon normalbg">xp de sorteo x3</div></div>
                                <div class="item"><div class="hexagon yellowbg">Tickets para el sorteo x3</div></div>
                                <div class="item"><div class="hexagon normalbg">xp mistery box x3</div></div>
                                <div class="item"><div class="hexagon normalbg">xp Bitlambo Games x3</div></div>
                                <div class="item"><div class="hexagon normalbg">xp Afiliado x3</div></div>
                                <div class="item"><div class="hexagon normalbg">Máximo 750 NFTs</div></div>
                            </div>

                            <div className='RangoMore'> <Link className='MoreButton' href="MembersMore#RangoPlata">Conocer rango plata.</Link></div>

                        </div>
                    </div>
                    <br /><br />
                    <div className='twoColumns'>
                        <div className='imgColumn'>
                            <h2>Rango Bronce</h2>
                            <br />
                            <img src="rangos/Bronze.gif" alt="" />
                            <br /><br />
                            <h3>100$</h3>
                            {(level == "Bronze" || level == "Silver" || level == "Gold" || level == "Diamond") ? (
                                <>
                                    <button className="ActionButton">Ya eres miembro con rango</button>
                                </>
                            ) : (
                                <>
                                    {isSuccess ? (
                                        <>
                                            <button disabled={!isConnected} onClick={() => mintBronze()} className="ActionButton">Confirmar compra</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => Approve?.()} className="ActionButton"> Comprar rango bronce </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                        <div className='textColumn'>
                            <div class="containero">
                                <div class="item"><div class="hexagon normalbg">XP registro x2</div></div>
                                <div class="item"><div class="hexagon normalbg">Xp miembro diamante x2</div></div>
                                <div class="item"><div class="hexagon normalbg">Xp preventa x2</div></div>
                                <div class="item"><div class="hexagon normalbg">Xp BTl x2</div></div>
                                <div class="item"><div class="hexagon normalbg">xp de sorteo x2</div></div>
                                <div class="item"><div class="hexagon yellowbg">Tickets para el sorteo x2</div></div>
                                <div class="item"><div class="hexagon normalbg">xp mistery box x2</div></div>
                                <div class="item"><div class="hexagon normalbg">xp Bitlambo Games x2</div></div>
                                <div class="item"><div class="hexagon normalbg">xp Afiliado x2</div></div>
                                <div class="item"><div class="hexagon normalbg">Máximo 1500 NFTs</div></div>
                            </div>

                            <div className='RangoMore'> <Link className='MoreButton' href="MembersMore#RangoBronce">Conocer rango bronce.</Link></div>

                        </div>
                    </div>

                </section>

                <br /><br />

            </body>

        </>
    );

}
