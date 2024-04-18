import React, { useState, useContext, useEffect, useRef } from "react";

import {
    useDisconnect,
    useAccount,
    usePrepareContractWrite,
    usePrepareContractRead,
    useContractRead,
    useContractWrite,
    useWaitForTransaction,
} from "wagmi";

import SystemABI from "../abi/SystemABI.json";

import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = "25R4hRHYC4UNVxrenpd7sTxgBEb"
const projectSecretKey = "95178cf876a2f7164771e61f8441e83f"
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const Popup = ({ show, onClose }) => {
    const { address } = useAccount();
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect()
    const [showPopup, setShowPopup] = useState(false);



    // Contracts
    const [SystemContract, setSystemContract] = useState({ address: '0x4113720450864e7d9e35C3CBa7FA7e5D9C55CD27', abi: SystemABI });

    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [affiliateCode, setaffiliateCode] = useState('0x0000000000000000000000000000000000000000');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);

        if (!isChecked) {
            setaffiliateCode('0x0000000000000000000000000000000000000000');
        }
    };

    const handleAffiliateCodeChange = (event) => {
        setaffiliateCode(event.target.value);
    };

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleTermsChange = (event) => {
        setTermsAccepted(event.target.checked);
    }

    // Register Function
    const { config } = usePrepareContractWrite({
        ...SystemContract,
        functionName: 'registerUser',
        args: [nickname, email, "bafybeieyczeepffvs3jk4rsmwtm4e2wqsjtkoay7a3i7szovhir3qa7pv4/profile.png", affiliateCode]
    });
    const { data, write: registerUser, isSuccess: isSuccessRegister } = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });


    // Verify member
    const [isMember, setIsMember] = React.useState(false);

    const { data: dataIsMember } = useContractRead({
        ...SystemContract,
        functionName: 'isWalletRegistered',
        args: [address],
        watch: true,
    });

    React.useEffect(() => {
        if (dataIsMember !== undefined) {
            setIsMember(Boolean(dataIsMember)); // Convierte a booleano
        }
    }, [dataIsMember]);


    return (
        <div className="LoginMain" style={{ display: show ? 'block' : 'none' }}>
            <div className="LoginMainContainer" >
                {isMember ? (
                    <>
                        <div className='LoginContainer'>
                            <h2>Login sucessfull</h2>
                            <button onClick={onClose}>Close</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='LoginContainer'>
                            <h2>Sing Up </h2>
                            <p>Create your account to access Bitlambo.</p>
                            <hr />

                            <div>
                                <form className='UserInfoForm' onSubmit={handleSubmit}>
                                    <div className='UserForm'>
                                        <label>Address:</label>
                                        <input
                                            type="text"
                                            value={address}
                                            readOnly
                                        />
                                    </div>
                                    <div className='UserForm'>
                                        <label>Nickname:</label>
                                        <input
                                            type="text"
                                            value={nickname}
                                            onChange={handleNicknameChange}
                                        />
                                    </div>
                                    <div className='UserForm'>
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                    </div>
                                    <div className='UserForm margin10top'>
                                        <label className="centerForm" >
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={handleCheckboxChange}
                                            />
                                            <span className='labelText'>I have affiliate code</span>
                                        </label>
                                        {isChecked && (
                                            <div>
                                                <label>
                                                    <input className="fullinput"
                                                        type="text"
                                                        value={affiliateCode}
                                                        onChange={handleAffiliateCodeChange}
                                                    />
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                    <div className='UserForm'>
                                        <label className="centerForm">
                                            <input
                                                type="checkbox"
                                                checked={termsAccepted}
                                                onChange={handleTermsChange}
                                            />
                                            I agree with terms and conditions.
                                        </label>
                                    </div>
                                </form>
                            </div>



                            <button onClick={() => registerUser?.()} className="ActionButton"> {isLoading ? 'Loading...' : 'Create Account'} </button>
                            <br />
                            <button className='closeButton' onClick={disconnect}>Cancelar</button>


                        </div>

                    </>
                )}

            </div>
        </div>
    );
};

export default Popup;
