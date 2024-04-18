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

    // Contracts
    const [SystemContract, setSystemContract] = useState({ address: '0x37308C98708C2449dfbEa30BFe35554A7031E705', abi: SystemABI });

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
        args: [nickname, email, photoCID, affiliateCode]
    });
    const { data, write, isSuccess: isSuccessRegister } = useContractWrite(config);

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
                            <div className="UserAvatar">
                                <p>Profile Image</p>
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
                                            <button className='InputButton' type="submit">Upload file</button>
                                        </form>
                                    </>
                                )}

                            </div>

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
                                    <div className='UserForm'>
                                        <label >
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
                                                    <input
                                                        type="text"
                                                        value={affiliateCode}
                                                        onChange={handleAffiliateCodeChange}
                                                    />
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                    <div >
                                        <label>
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

                            <button onClick={() => write?.()} className="ActionButton"> {isLoading ? 'Loading...' : 'Create Account'} </button>




                        </div>

                    </>
                )}

            </div>
      
    );
};

export default Popup;
