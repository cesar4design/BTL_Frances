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

export default function HomePage() {
  const { address } = useAccount();
  const { isConnected } = useAccount();

  const { open, close } = useWeb3Modal();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => { }, []);

  // Contracts
  const [SystemContract, setSystemContract] = useState({ address: '0x4113720450864e7d9e35C3CBa7FA7e5D9C55CD27', abi: SystemABI });


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

        <Presale></Presale>

        <br /><br />

        <section>
          <div class="slider">
            <div class="slide-track">
              <div class="slide">
                <img src="./partners/1.png" alt="" />
              </div>
              <div class="slide">
                <img src="./partners/2.png" alt="" />
              </div>
              <div class="slide">
                <img src="./partners/3.png" alt="" />
              </div>
              <div class="slide">
                <img src="./partners/4.png" alt="" />
              </div>
              <div class="slide">
                <img src="./partners/5.png" alt="" />
              </div>
              <div class="slide">
                <img src="./partners/6.png" alt="" />
              </div>
              <div class="slide">
                <img src="./partners/7.png" alt="" />
              </div>
              <div class="slide">
                <img src="./partners/8.png" alt="" />
              </div>

              <div class="slide">
                <img src="./partners/1.png" alt="" />
              </div>
              <div class="slide">
                <img src="./partners/2.png" alt="" />
              </div>
              <div class="slide">
                <img src="./partners/3.png" alt="" />
              </div>
              <div class="slide">
                <img src="./partners/4.png" alt="" />
              </div>
              <div class="slide">
                <img src="./partners/5.png" alt="" />
              </div>
              <div class="slide">
                <img src="./partners/6.png" alt="" />
              </div>
              <div class="slide">
                <img src="./partners/7.png" alt="" />
              </div>
              <div class="slide">
                <img src="./partners/8.png" alt="" />
              </div>
            </div>
          </div>
        </section>

        <br /><br /><br /><br />

        <section>
          <h1 className='SubtitleBg'>Qu'est-ce que Bitlambo ?</h1>
          <div className='twoColumns'>
            <div className='textColumn'>
              <p className='Text'>
                Bitlambo est un écosystème de jeux où les membres pourront démontrer leurs compétences à travers les différents défis et compétitions de la plateforme GameFi, BTL Games. L'objectif est d'offrir la meilleure expérience possible. Les membres entreront dans un environnement nouveau et différent où ils devront créer une stratégie pour gagner à court, moyen ou long terme. Tout un univers de jeux P2E et MOG.
                <br /><br />
                Nous pensons qu'il est juste que tous les membres puissent bénéficier de Bitlambo. L'intention est que en participant à l'écosystème, les membres aient la possibilité de profiter de ce que génère le projet Bitlambo. De cette idée naît la BTL League. Que ce soit en jouant à BTL games, en investissant dans BTL ou en aidant la communauté à se développer, le système de bonus récompensera avec des points XP. À la fin de la saison, les mieux classés obtiendront d'incroyables récompenses crypto.
                <br /><br />
                De plus, en remerciement pour leur participation et leur confiance, au cours de cette année, Bitlambo proposera des tirages au sort exclusifs pour les membres, où ils pourront gagner des Bitcoins et des véhicules Lamborghini.
              </p>
              <div className='MoreContainer'>
                <a className='MoreButton' target="_blank" href="WhitepaperBTL.pdf">Voir le livre blanc.</a>
              </div>
            </div>

            <div className='imgColumn'>
              <img src="logo.gif" alt="" />
            </div>
          </div>
        </section>

        <br /><br /><br /><br />

        <section>
          <h1 className='SubtitleBg'>Membres de Bitlambo</h1>
          <div className='twoColumns'>
            <div className='imgColumn'>
              <img src="miembros.jpg" alt="" />
            </div>
            <div className='textColumn'>
              <p className='Text'>
                Devenez membre, choisissez votre rang, investissez dans le jeton BTL, invitez d'autres personnes, jouez à BTL Games et gagnez des Lambos et des BTC.
                <Link className='MoreButton' href="Members"> Continuer la lecture.</Link>
              </p>

              {(level == "Bronze" || level == "Silver" || level == "Gold" || level == "Diamond" || level == "Member") ? (
                <>
                  <button className="ActionButton">Vous êtes déjà membre</button>
                </>
              ) : (
                <>
                  <button onClick={() => open()} className='ActionButton'>Je veux devenir membre</button>
                </>
              )}

            </div>


          </div>

          <br /><br />

          <div className='twoColumns'>

            <div className='textColumn'>
              <h2>Rangs</h2>
              <p className='Text'>
                Il existe 4 types de rang, chacun avec ses avantages.
                <br />
                Choisissez votre rang et multipliez vos billets pour le tirage, augmentant ainsi vos chances de gagner.
                <Link className='MoreButton' href="Members#Rangos"> Continuer la lecture.</Link>
              </p>

              {(level == "Bronze" || level == "Silver" || level == "Gold" || level == "Diamond") ? (
                <>
                  <button className="ActionButton">Vous êtes déjà membre avec un rang</button>
                </>
              ) : (
                <>
                  <br />
                  <Link href="Members#Rangos" className='ActionButton'>Choisir un rang</Link>
                </>
              )}

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

          <br /><br />

          <div className='twoColumns'>
            <div className='imgColumn'>
              <img src="miembrosVIP.jpg" alt="" />
            </div>

            <div className='textColumn'>
              <h2>Membres VIP</h2>
              <p className='Text'>
                <span className='yellow'>Pourquoi investir dans le jeton BTL ?</span>
                <br />
                Si vous avez vraiment compris la valeur et le potentiel de Bitlambo, vous serez d'accord que ce type de prix et de récompenses qu'il offre est révolutionnaire dans le monde crypto.
                <br /><br />
                Vous saurez qu'une forte participation est attendue, ce qui augmentera de manière exponentielle. La majeure partie des bénéfices générés, en particulier pendant la phase initiale du projet, sera réinvestie dans la croissance et l'amélioration. Principalement dans le développement blockchain pour rendre le système aussi sûr et efficace que possible, dans le développement de la web 3.0 pour offrir la meilleure expérience possible aux membres, en fournissant des avantages supplémentaires à ses membres et en marketing pour faire croître la communauté.
                <Link className='MoreButton' href="Members#MembersVIP"> Continuer la lecture.</Link>
              </p>
              <Link href="Members#Diamante"> <button className='ActionButton'>Je veux devenir membre VIP</button></Link>
            </div>


          </div>

          <br /><br />
          <div className='twoColumns'>
            <div className='textColumn'>
              <h2>Système d'affiliation</h2>
              <p className='Text'>
                En vous inscrivant en tant que membre de Bitlambo, vous recevrez un code unique à partager avec votre communauté. Invitez d'autres personnes à rejoindre et gagnez des récompenses crypto.
                <Link className='MoreButton' href="Members#Afiliados"> Continuer la lecture.</Link>
              </p>
              <a> <button onClick={() => open()} className='ActionButton'>Je veux devenir membre affilié</button></a>
            </div>

            <div className='imgColumn'>
              <img src="afiliados.jpg" alt="" />
            </div>
          </div>
        </section>

        <br /><br /><br /><br />

        <section>
          <h1 className='SubtitleBg'>BTL League</h1>
          <div className='twoColumns'>
            <div className='imgColumn'>
              <img src="BTLLeague.jpg" alt="" />
            </div>

            <div className='textColumn'>
              <p className='Text'>
                Bitlambo dispose d'un système de bonus appelé points XP. En jouant à des jeux, en participant aux tirages, en ayant un rang, en investissant dans BTL ou en amenant plus de personnes dans la communauté, vous obtiendrez des points XP.
                <Link className='MoreButton' href="BTLLeague"> Continuer la lecture.</Link>
              </p>
              <Link href="Members"> <button className='ActionButton'>Je veux devenir membre</button></Link>
            </div>


          </div>
        </section>

        <br /><br /><br /><br />

        <section>
          <h1 className='SubtitleBg'>Tirage spécial : Prévente BTL</h1>
          <div className='twoColumns'>
            <div className='textColumn'>
              <p className='Text'>
                Les billets pour le premier tirage seront obtenus via la prévente du jeton BTL qui aura lieu sur la page officielle de Bitlambo (Bitlambo.org).
                <a className='MoreButton' href="./"> Continuer la lecture.</a>
              </p>
              <a href="./"> <button className='ActionButton'>Je veux participer</button></a>
            </div>

            <div className='imgColumn'>
              <img src="Sorteo.jpeg" alt="" />
            </div>
          </div>
        </section>

        <br /><br /><br /><br />

        <section>
          <h1 className='SubtitleBg'>Mistery Box</h1>
          <div className='twoColumns'>
            <div className='imgColumn'>
              <img src="Mistery.png" alt="" />
            </div>

            <div className='textColumn'>
              <p className='Text'>
                Avec un total de 9 collections différentes, les MYSTERY BOX NFT de Bitlambo vont distribuer de grands prix.
                <a className='MoreButton' href=""> Continuer la lecture.</a>
              </p>
              <br />
              <p className='Text'>
                1ère collection de Mistery Box
                <br /><br />
                Prochainement…
              </p>
            </div>


          </div>
        </section>

        <br /><br />

        <section className='containeroSection'>
          <div class="containero">

            <div class="item"><div class="hexagon yellowbg">Devenez membre</div></div>
            <div class="item"><div class="hexagon yellowbg">Choisissez votre rang</div></div>
            <div class="item"><div class="hexagon normalbg">Gagnez une Lamborghini</div></div>
            <div class="item"><div class="hexagon normalbg">Grimpez dans le classement de la BTL League</div></div>
            <div class="item"><div class="hexagon normalbg">Multipliez vos billets</div></div>
            <div class="item"><div class="hexagon normalbg">Obtenez des récompenses crypto avec les mystères box</div></div>
            <div class="item"><div class="hexagon yellowbg">Investissez dans BTL</div></div>
            <div class="item"><div class="hexagon yellowbg">Invitez vos amis</div></div>
            <div class="item"><div class="hexagon yellowbg">Devenez membre VIP</div></div>
            <div class="item"><div class="hexagon normalbg">Rentabilisez votre investissement dans BTL</div></div>
            <div class="item"><div class="hexagon normalbg">Gagnez des Bitcoins</div></div>
            <div class="item"><div class="hexagon yellowbg">Obtenez vos billets pour le tirage</div></div>
            <div class="item"><div class="hexagon normalbg">Multipliez vos points XP</div></div>
            <div class="item"><div class="hexagon yellowbg">Montrez qui est le roi des BTL Games</div></div>


          </div>

        </section>

        <span id='Tokenomics'></span>
        <br />

        <section id='Tokenomics' className='TokenomicsSection'>
          <h1 className='SubtitleBg'>Tokenomics</h1>
          <div className='twoColumns'>

            <div className='textColumn'>
              <p className='Text'>
                Adresse du contrat : <span className='negrita'>0x023edf324b01D6A1767325018AC5a40317D6dcad</span>
                <br />
                Nom du jeton : <span className='negrita'>BITLAMBO</span>
                <br />
                Symbole du jeton : <span className='negrita'>$BTL</span>
                <br />
                Décimales : <span className='negrita'>5</span>
                <br />
                Blockchain : <span className='negrita'>Polygon</span>
                <br /> <br />
                Taxe d'achat : <span className='negrita'>2%</span>
                <br />
                1% Développement
                <br />
                1% Jackpot de la BTL League
                <br /> <br />
                Taxe de vente : <span className='negrita'>2%</span>
                <br />
                1% Développement
                <br />
                1% Jackpot de la BTL League
                <br /> <br />
                Offre de jetons : <span className='negrita'>86 000 000 tokens</span>
              </p>

            </div>

            <div className='imgColumn'>
              <img className='outsideChart' src="chartv2.svg" alt="" />

            </div>

          </div>
        </section>

        <br /><br /><br />
        <span id='Roadmap'></span>
        <br />

        <section>
          <h1 className='SubtitleBg'>Roadmap</h1>
          <div class="timeline">
            <div class="outer">

              <div class="card">
                <div class="info">
                  <h3 class="title">T1 2024</h3>
                  <p>
                    Développement de l'application mint NFT <br />
                    Planification stratégique marketing <br />
                    Conception et création de NFT pour les rangs <br />
                    Conception et création de NFT pour les billets <br />
                    Mise en place de la BTL League <br />
                    Développement de la plateforme BTL Games
                  </p>
                </div>
              </div>

              <div class="card">
                <div class="info">
                  <h3 class="title"> T2 2024</h3>
                  <p className='texta'>
                    Lancement de la plateforme web <br />
                    Audit <br />
                    Début de la première BTL League <br />
                    Activation des NFT pour les rangs BTL <br />
                    Début du programme d'affiliation <br />
                    Campagne marketing <br />
                    Prévente BTL
                  </p>
                </div>
              </div>

              <div class="card">
                <div class="info">
                  <h3 class="title">T3 2024</h3>
                  <p>
                    Célébration du 1st BTL LOTTO DAY <br />
                    Lancement de $BTL sur Uniswap <br />
                    Début du programme des membres BTL VIP <br />
                    Cotation sur Coinmarketcap et Coingecko <br />
                    Activation des billets NFT Bitlambo Lotto <br />
                    Lancement des Mystery Boxes NFTs <br />
                    Cotation sur les CEX
                  </p>
                </div>
              </div>

              <div class="card">
                <div class="info">
                  <h3 class="title">T4 2024</h3>
                  <p>
                    Activités marketing <br />
                    Lancement de la plateforme de jeux BTL Games <br />
                    Lancement des Laberintos de Bitlambo <br />
                    Bitlambo store <br />
                    Développement de Bitlambo Labs <br />
                    Cotation sur les CEX <br />
                  </p>
                </div>
              </div>

              <div class="card">
                <div class="info">
                  <h3 class="title">T1 2025</h3>
                  <p>
                    Collaborations avec de nouveaux projets <br />
                    Réponse et Gagnez des crypto <br />
                    Chasse aux trésors BTL <br />
                    Marketing + influenceurs <br />
                    Lancement de BTL Labs <br />
                    Cotation sur les CEX <br />
                  </p>
                </div>
              </div>

              <div class="card">
                <div class="info">
                  <h3 class="title">T2 2025</h3>
                  <p>
                    Célébration et récompenses 1rst. BTL League <br />
                    Week-end Bitlambo <br />
                    Cotation sur les CEX <br />
                    Nouvelle collection de NFT pour les rangs <br />
                    Début de la 2n. BTL League <br />
                    Nouvelles collections d'articles de jeux <br />
                  </p>
                </div>
              </div>

              <div class="card">
                <div class="info">
                  <h3 class="title">T1 2025</h3>
                  <p>
                    À venir
                  </p>
                </div>
              </div>

            </div>
          </div>


        </section>

        <br /><br /><br />
        <span id='Team'></span>
        <br />

        <section>
          <h1 className='SubtitleBg'>Team</h1>
          <div className='twoTeamColumns'>
            <div>
              <video autoPlay muted src="5.mp4" alt="" />
            </div>
            <div>
              <video autoPlay muted src="2.mp4" alt="" />
            </div>
          </div>
          <br /><br />
          <div className='twoTeamColumns'>
            <div>
              <video autoPlay muted src="1.mp4" alt="" />
            </div>
            <div>
              <video autoPlay muted src="3.mp4" alt="" />
            </div>
            <div>
              <video autoPlay muted src="4.mp4" alt="" />
            </div>

          </div>
        </section>



        <br /><br />

      </body>
    </>
  );

}
