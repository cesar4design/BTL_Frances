import { useWeb3Modal } from '@web3modal/wagmi/react'
import React, { useState, useEffect, useRef } from "react";
import {
  useDisconnect,
  useAccount,
  usePrepareContractWrite,
  usePrepareContractRead,
  useContractRead,
  useContractWrite,
} from "wagmi";

import SystemABI from "../abi/SystemABI.json";
import USDTABI from "../abi/USDTABI.json";
import BTLABI from "../abi/BTLABI.json";

import ProgressBar from "@ramonak/react-progress-bar";

import { ethers, parseEther } from 'ethers';



const Presale = () => {
  const { address } = useAccount();
  const { isConnected } = useAccount();

  const { open, close } = useWeb3Modal()


  function calculateSecondsUntilTargetDate(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);

    // Calcula la diferencia en milisegundos entre ahora y la fecha objetivo
    const difference = target - now;

    // Convierte la diferencia de milisegundos a segundos y devuelve el resultado
    return Math.floor(difference / 1000);
  }

  const targetDate = new Date(2024, 3, 26, 19, 0, 0); // 26 de abril a las 19:00 horas del 2024
  const initialSeconds = calculateSecondsUntilTargetDate(targetDate);

  const [remainingTime, setRemainingTime] = useState(initialSeconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const days = Math.floor(remainingTime / (24 * 60 * 60));
  const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
  const seconds = remainingTime % 60;

  window.onload = function () {
    // obtener la cantidad y el total de algún lugar
    const cantidad = 10000;
    const total = 1000000;

    // calcular el porcentaje completado
    const porcentajeCompletado = (cantidad / total) * 100;

    // actualizar la barra de progreso
    const progress = document.querySelector('.progress');
    progress.style.width = porcentajeCompletado + '%';

    // actualizar el texto de progreso
    const progressText = document.querySelector('.progress-text');
    progressText.textContent = "Raised: " + cantidad + '$' + ' / ' + total + '$';
  };



  // Buy Amount selector
  const [BuyQuantity, setBuyQuantity] = useState(20);

  const handleBuyInputChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setBuyQuantity(newQuantity);
    } else {
      setBuyQuantity(""); // Establece el valor del campo como una cadena vacía si no es un número válido o es negativo.
    }
  };

  const SwapDCQuantityWei = (BuyQuantity).toString();
  const approveUSDTTokens = (BuyQuantity * 10 ** 6).toString();



  // Contracts
  const [SystemContract, setSystemContract] = useState({ address: '0x4113720450864e7d9e35C3CBa7FA7e5D9C55CD27', abi: SystemABI });
  const [USDTContract, setUSDTTokenAddress] = useState({ address: '0x5e1AD32700181207571B81eCAECE491C5C690cf9', abi: USDTABI });
  const [BTLContract, setBTLTokenAddress] = useState({ address: '0x023edf324b01D6A1767325018AC5a40317D6dcad', abi: BTLABI });

  // NFT Aprove USDT
  const { config: ApproveUSDT } = usePrepareContractWrite({
    ...USDTContract,
    functionName: "approve",
    args: ["0x4113720450864e7d9e35C3CBa7FA7e5D9C55CD27", approveUSDTTokens],
  });

  const { write: Approve, isLoading, isSuccess } = useContractWrite(ApproveUSDT);

  // Buy Tokens
  const { write: buyPresale } = useContractWrite({
    ...SystemContract,
    functionName: "buyPresale",
    args: [SwapDCQuantityWei],
  });

  // Read btl tokens
  const [tokens, setTokens] = React.useState(false);

  const { data: dataTokens } = useContractRead({
    ...BTLContract,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  });

  React.useEffect(() => {
    if (dataTokens !== undefined) { setTokens(dataTokens); }
  }, [dataTokens]);

  const weiTokens = tokens.toString();

  const stringTokens = weiTokens / 1000000000000000000;

  const ticketsInfo = Math.floor(BuyQuantity / 20);






  return (
    <>

      <section className='PresaleSection' >
        <h1 className='Subtitle'>Sorteo especial: Preventa BTL Token</h1>
        <div className='YellowBox'>
          <div className='PrizesContainer'>
            <div className='FlexCenter'>
              <div className='prizeColumn'>
                <img src="coche.png" alt="" />
              </div>
              <div className='progressBarColumn'>
                <p>1º Premio: <span className='negrita'> LAMBO HURACAN</span></p>
                <ProgressBar
                  completed={30}
                  height={15}
                  bgColor="#F8BC00"
                  isLabelVisible={false}
                  labelColor="#e80909"
                  maxCompleted={100}
                />
              </div>
            </div>
          </div>
          <div className='PrizesContainer'>
            <div className='FlexCenter'>
              <div className='prizeColumn'>
                <img src="btc.png" alt="" />
              </div>
              <div className='progressBarColumn'>
                <p>2º Premio: <span className='yellow negrita'> BITCOIN (1)</span></p>
                <ProgressBar
                  completed={30}
                  height={15}
                  bgColor="#F8BC00"
                  isLabelVisible={false}
                  labelColor="#e80909"
                  maxCompleted={100}
                />
              </div>
            </div>
          </div>


          <div className='CountMain'>
            <div className='CountSub'>
              <div>{days}</div>
              <div className='timeText'>Días</div>
            </div>
            <div className='timeSpace'>
              :
            </div>
            <div className='CountSub'>
              <div>{hours}</div>
              <div className='timeText'>Horas</div>
            </div>
            <div className='timeSpace'>
              :
            </div>
            <div className='CountSub'>
              <div>{minutes}</div>
              <div className='timeText'>Minutos</div>
            </div>
            <div className='timeSpace'>
              :
            </div>
            <div className='CountSub'>
              <div>{seconds}</div>
              <div className='timeText'>Segundos</div>
            </div>
          </div>

          <div className='PriceContainer'>
            <div className='currentPrice'>
              <p>Precio inicial: <span className='blodText'>0.12999</span> </p>
            </div>

            <div className='currentPrice'>
              <p>Precio siguiente: <span className='blodText'>0.13999</span> </p>
            </div>
          </div>

          <div>
            <img className='TikcetImg' src="Ticket.gif" alt="" />
            <p>20 $USDT / Ticket</p>
          </div>

          <div className='PriceContainer'>
            <div className='currentPrice'>
              <p>Min. <span className='blodText'>20 $USDT</span> </p>
            </div>

            <div className='currentPrice'>
              <p>Max. <span className='blodText'>2000 $USDT</span> </p>
            </div>
          </div>

          <div className='lowBottom'>

            <p>Introducir cantidad $USDT</p>

            <div className='flexCenterTicket'>
              <input className="buyInput"
                inputMode="numeric"
                value={BuyQuantity}
                onChange={handleBuyInputChange}
              />

              <p>
              {ticketsInfo} Tickets
              </p>

            </div>




          </div>

          {!isConnected ? (
            <>
              <button className='ActionButton' onClick={() => open()}>Comprar BTL</button>
            </>
          ) : (
            <>
              {isSuccess ? (
                <>
                  <button disabled={!isConnected} onClick={() => buyPresale()} className="ActionButton">Comprar BTL</button>
                </>
              ) : (
                <>
                  <button onClick={() => Approve?.()} className="ActionButton"
                  > Aprobar $USDT </button>
                </>
              )}
            </>
          )}


        </div>
      </section>

    </>
  );

}

export default Presale;
