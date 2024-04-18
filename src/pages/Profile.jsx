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

import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = "25R4hRHYC4UNVxrenpd7sTxgBEb"
const projectSecretKey = "95178cf876a2f7164771e61f8441e83f"
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);


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

    // Read avatar
    const [avatar, setAvatar] = React.useState(false);

    const { data: dataAvatar } = useContractRead({
        ...SystemContract,
        functionName: 'getAvatar',
        args: [address],
        watch: true,
    });

    React.useEffect(() => {
        if (dataAvatar !== undefined) { setAvatar(dataAvatar); }
    }, [dataAvatar]);

    // Read Name
    const [nick, setNick] = React.useState(false);

    const { data: dataNick } = useContractRead({
        ...SystemContract,
        functionName: 'getNick',
        args: [address],
        watch: true,
    });

    React.useEffect(() => {
        if (dataNick !== undefined) { setNick(dataNick); }
    }, [dataNick]);

    // Read XP
    const [userXP, seUserXP] = React.useState(false);

    const { data: dataUserXP } = useContractRead({
        ...SystemContract,
        functionName: 'userXP',
        args: [address],
        watch: true,
    });

    React.useEffect(() => {
        if (dataUserXP !== undefined) { seUserXP(dataUserXP); }
        console.log(userXP)
    }, [dataUserXP]);

    const stringUserXP = userXP.toString();

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

    // Read Tickets
    const [tickets, setTickets] = React.useState(false);

    const { data: dataTickets } = useContractRead({
        ...SystemContract,
        functionName: 'getTickets',
        args: [address],
        watch: true,
    });

    React.useEffect(() => {
        if (dataTickets !== undefined) { setTickets(dataTickets); }
    }, [dataTickets]);

    const stringTickets = tickets.toString();

    // Change image
    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => {
        setIsOpen(true);
    };
    const closePopup = () => {
        setIsOpen(false);
    };

    // IPFS Upload
    const [photoCID, setPhotoCID] = useState('');
    const [images, setImages] = useState([])
    const ipfs = ipfsHttpClient({
        url: "https://ipfs.infura.io:5001/api/v0",
        headers: {
            authorization
        }
    })
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const form = event.target;
        const files = (form[0]).files;

        if (!files || files.length === 0) {
            return alert("No files selected");
        }

        const file = files[0];
        // upload files
        const result = await ipfs.add(file);

        setPhotoCID(result.cid); // Establecer el CID de la foto subida

        setImages([
            ...images,
            {
                cid: result.cid,
                path: result.path,
            },
        ]);

        form.reset();
    };

    // Register Function
    const { config } = usePrepareContractWrite({
        ...SystemContract,
        functionName: 'changeAvatar',
        args: [photoCID]
    });
    const { data, write: registerUser, isSuccess: isSuccessRegister } = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false); // Cierra el popup cuando isSuccess se activa
        }
    }, [isSuccess]);


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

                <section className='ProfileSection'>

                    <div>

                       
                        <img src={"https://skywalker.infura-ipfs.io/ipfs/" + avatar} onClick={openPopup} />
                        <h3 className='yellow negrita'> Nick: {nick} </h3>
                        {isOpen && (
                            <div className="popup">



                                <h5>Cambiar imagen de perfil</h5>
                                <br />
                                <div className='AvatarPreview'>
                                    {images.map((image, index) => (
                                        <img
                                            alt={`Uploaded #${index + 1}`}
                                            src={"https://skywalker.infura-ipfs.io/ipfs/" + image.path}
                                            style={{ borderRadius: "12px", maxHeight: "150px", margin: "15px" }}
                                            key={image.cid.toString() + index}
                                        />
                                    ))}
                                </div>
                                {ipfs && (
                                    <>
                                        <form className='UserAvatarForm' onSubmit={onSubmitHandler}>
                                            <input className='AvatarInput' type="file" name="file" />
                                            <button className='InputButton black' type="submit">Upload file</button>
                                        </form>
                                    </>
                                )}
                                <button onClick={() => registerUser?.()} className="ActionButton"> {isSuccess ? 'Done!' : 'Confirm'} </button>

                                <button className='closeButton' onClick={closePopup}>Cerrar</button>
                            </div>
                        )}
                    </div>

                    <div>
                        
                        <p className='n1'> Rank: {level} </p>
                        <p className='n2'> Puntos: {stringUserXP} XP </p>
                        <p className='n3'> Referido: {nick} </p>
                        <p className='n2'> Tickets para el sorteo: {stringTickets} </p>
                        <p className='n1'> Mistery box abiertas: 0 </p>
                    </div>

                </section>

                <br /><br />

            </body>

        </>
    );

}
