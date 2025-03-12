import React, { Fragment, useState, useRef } from 'react';
import { Card, Col, Row, Tab, Nav, OverlayTrigger, Tooltip, Dropdown, Button } from 'react-bootstrap';
import face9 from '../../../assets/images/faces/9.jpg';
import ecommers1 from '../../../assets/images/ecommerce/jpg/7.jpg';
import { Link } from 'react-router-dom';
import { Conversacionesdata } from './conversaciones-data';
import SimpleBar from 'simplebar-react';
import audioFile from '../../../assets/audios/900664708.mp3';
// Audio Player Component
const AudioPlayer = ({ audioSrc }) => {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	const handlePlay = () => {
		audioRef.current.play();
		setIsPlaying(true);
	};

	const handlePause = () => {
		audioRef.current.pause();
		setIsPlaying(false);
	};

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	};

	const handleTimeUpdate = () => {
		setCurrentTime(audioRef.current.currentTime);
	};

	const handleLoadedMetadata = () => {
		setDuration(audioRef.current.duration);
	};

	const handleSeek = (e) => {
		const seekTime = (e.target.value / 100) * duration;
		audioRef.current.currentTime = seekTime;
		setCurrentTime(seekTime);
	};

	return (
		<div className="audio-player-container">
			<audio
				ref={audioRef}
				src={audioSrc}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
			/>
			<div className="d-flex align-items-center">
				<Button
					variant="light"
					className="btn-icon rounded-circle me-2"
					onClick={isPlaying ? handlePause : handlePlay}
				>
					<i className={`fe ${isPlaying ? 'fe-pause' : 'fe-play'}`}></i>
				</Button>
				<div className="flex-grow-1 ms-2">
					<input
						type="range"
						className="form-range"
						min="0"
						max="100"
						value={duration ? (currentTime / duration) * 100 : 0}
						onChange={handleSeek}
					/>
				</div>
				<div className="ms-2 text-muted fs-12">
					{formatTime(currentTime)} / {formatTime(duration)}
				</div>
			</div>
		</div>
	);
};

const Conversaciones = () => {
	const [mainImgSrc, setMainImgSrc] = useState({
		imgSrc: face9,
		name: '+51960953104',
	});
	const handleLinkClick = (imgSrc, name) => {
		setMainImgSrc({
			imgSrc: imgSrc || defaultImage,
			name: name || 'Default Name'
		});
	};
	return (
		<Fragment>
			{/* <!-- row --> */}
			<Row className=" row-sm mb-4">
				<Col xl={12} className="">
					<Row className="">
						<Col xl={12} xxl={3} lg={12} className="">
							<Card className="overflow-hidden">
								<div className="main-content-app">
									<Tab.Container defaultActiveKey="tab1">
										<div className="main-content-left main-content-left-chat overflow-hidden">
											<div className="p-2">
												<input
													type="text"
													className="form-control"
													placeholder="Buscar conversaciones..."
													aria-label="Search conversations"
												/>
											</div>
											<Nav variant='' className=" main-nav-line main-nav-line-chat">

												<Nav.Item>
													<Nav.Link eventKey='tab1' data-bs-toggle="tab" >Conversaciones </Nav.Link>
												</Nav.Item>
												{/* <Nav.Item>
													<Nav.Link eventKey='tab2' data-bs-toggle="tab" >Groups</Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link eventKey='tab3' data-bs-toggle="tab" >Calls</Nav.Link>
												</Nav.Item> */}
											</Nav>
											<Tab.Content>
												<SimpleBar className="main-chat-list" id="ChatList" >
													{Conversacionesdata.map((idx) => (
														<div className={`media ${idx.class}`} key={idx.id} onClick={() => handleLinkClick(idx.imgSrc, idx.name)}>
															<div className="main-img-user avatar avatar-md">
																<img src={idx.imgSrc} alt="" />
																{/* Conditionally render the <span> */}
																{idx.showSpan && <span>{idx.unread}</span>} {/* This condition could be based on any field in idx */}
															</div>
															<div className="media-body">
																<div className="media-contact-name">
																	<span>{idx.name}</span> <span>{idx.time}</span>
																</div>
																<p>{idx.message}</p>
															</div>
														</div>
													))}
												</SimpleBar>
											</Tab.Content>
											{/* <!-- main-chat-list --> */}
										</div>
									</Tab.Container>
								</div>
							</Card>
						</Col>
						<Col lg={12} xl={12} xxl={6} >
							<Card className="overflow-hidden">
								<div className="main-content-app">
									<Link to="#" className="main-header-arrow" id="ChatBodyHide"></Link>
									<div className="main-content-body main-content-body-chat">
										<div className="main-chat-header">
											<div className="main-img-user avatar avatar-md"><img alt="" src={mainImgSrc.imgSrc} /></div>
											<div className="main-chat-msg-name">
												<h6>{mainImgSrc.name}</h6><small> hace 2 minutos</small>
											</div>
											{/* <nav className="nav">
												<Link to="#" className="nav-link"><i className="icon ion-md-more"></i></Link>
												<OverlayTrigger placement="top" overlay={<Tooltip >Call</Tooltip>}>
													<Link to="#" className="nav-link" ><i className="fe fe-star"></i></Link>
												</OverlayTrigger>
												<OverlayTrigger placement="top" overlay={<Tooltip >Trash</Tooltip>}>
													<Link to="#" className="nav-link" ><i className="fe fe-trash"></i></Link>
												</OverlayTrigger>
												<OverlayTrigger placement="top" overlay={<Tooltip >View Info</Tooltip>}>
													<Link to="#" className="nav-link" ><i className="fe fe-alert-circle"></i></Link>
												</OverlayTrigger>
											</nav> */}
										</div>
										{/* <!-- main-chat-header --> */}
										<div className="px-4 mt-4">
											<h6 className="mb-3">Grabación</h6>
											<AudioPlayer audioSrc={audioFile} />
										</div>

										<SimpleBar className="main-chat-body" id="ChatBody">
											<style>
												{`
      .user-bg {
        background-color: #daf8cb; /* Fondo verde claro para el cliente */
      }
      .agent-bg {
        background-color: rgb(193, 190, 226); /* Fondo morado claro para el bot */
      }
      .label-cliente {
        color: #228B22; /* Verde */
        font-weight: bold;
        margin-right: 6px;
      }
      .label-bot {
        color: #FFF; /* Blanco */
        font-weight: bold;
        margin-right: 6px;
      }
    `}
											</style>

											<div className="content-inner">
												<label className="main-chat-time"><span>Hoy</span></label>

												{/* 10:00 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Le saluda Marielsi. ¿Con quién tengo el gusto?
														</div>
														<div>
															<span>10:00 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:01 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Buenos días, señorita. Soy Diana Martínez López.
														</div>
														<div>
															<span>10:01 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:02 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Diana, mucho gusto. ¿La consulta es por el mismo número del cual llama?
														</div>
														<div>
															<span>10:02 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:03 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															No, por otro número, que tengo también que le saqué mi nombre.
														</div>
														<div>
															<span>10:03 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:04 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															¿Cuál sería el número, por favor?
														</div>
														<div>
															<span>10:04 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:05 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Un momentito, ahorita le brindo. Un momentito, por favor. A ver, a ver, a ver, a ver. Ya, es el nueve treinta y uno. Sí. Cero cinco uno cinco seis cinco.
														</div>
														<div>
															<span>10:05 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:06 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Cinco seis cinco. ¿En qué puedo ayudarle?
														</div>
														<div>
															<span>10:06 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:07 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Quiero suspender, este, este chip, porque lo perdí. Solamente el chip quisiera, este, darle de baja.
														</div>
														<div>
															<span>10:07 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:08 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															¿Quiere anular el número?
														</div>
														<div>
															<span>10:08 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:09 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Sí, quiero anular el número, porque, como puede ver, yo tengo este otro chip a mi nombre. Por pérdida.
														</div>
														<div>
															<span>10:09 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:10 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Sí, por pérdida. ¿Es usted la titular de la línea en consulta?
														</div>
														<div>
															<span>10:10 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:11 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Sí, señorita, sí.
														</div>
														<div>
															<span>10:11 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:12 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															¿Sus nombres y apellidos concretos, por favor?
														</div>
														<div>
															<span>10:12 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:13 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Dianita Martínez López.
														</div>
														<div>
															<span>10:13 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:14 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															¿Su número de documento de identidad, por favor?
														</div>
														<div>
															<span>10:14 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:15 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Cuarenta y seis, noventa y tres, sesenta y tres, cincuenta y cinco.
														</div>
														<div>
															<span>10:15 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:16 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															El documento brindado es un DNI. ¿Correcto?
														</div>
														<div>
															<span>10:16 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:17 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Sí, DNI.
														</div>
														<div>
															<span>10:17 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:18 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Un momento, por favor. Un momento, por favor. Sí. Muchas gracias por la espera. Sí. Diana, le indico las consideraciones de la cancelación de la línea. Viene indicarle que el proceso exactamente no tiene costo, indicarle que la cancelación de servicios se realizará en un plazo no menor de cinco días hábiles ni mayor de un mes calendario. Le recordamos que ejecutada la cancelación perderá todos los saldos o promociones que tuviera la línea y también estaría perdiendo el número. Ahora, la solicitud de cancelación estimada cliente puede ser presentada por el titular de forma telefónica o en un centro de atención al cliente. ¿Desea que le transfiera con el área de cancelaciones?
														</div>
														<div>
															<span>10:18 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:19 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Sí, señorita. Sí, quiero dar de baja ese número.
														</div>
														<div>
															<span>10:19 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:20 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Bien, estamos transfiriéndole al área de cancelaciones. Esto puede demorar unos minutos. Por favor, debe mantenerse en espera, no corte la llamada. Por su seguridad, antes de tomar su solicitud, realizaremos preguntas para validar su titularidad. Por ello, le recomendamos contar con su DNI físico cuando nuestro asesor haga las preguntas de validación. En este momento, todos nuestros asesores se encuentran ocupados. Por favor, espere, en breve lo atenderemos. Recuerde que el horario de atención de esta central es de lunes a domingo, de seis de la mañana a medianoche. Ahora realiza tus trámites de manera rápida y sencilla, esté donde estés. Con la app Mibitel, podrás actualizar tus datos, migrar de plan, reactivar tu línea y Minditel y realiza tú mismo tus trámites con un solo clic, sin salir de tu casa. Señora Pinalca es una de las direcciones y cancelaciones. ¿Con quién tengo el gusto?
														</div>
														<div>
															<span>10:20 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:21 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Buenos días, señorita. Soy una señora Diana Martínez López.
														</div>
														<div>
															<span>10:21 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:22 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Diana, buenos días. Dígame, permítame que desea realizar la migración de plan o cancelación en la línea.
														</div>
														<div>
															<span>10:22 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:23 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Quiero cancelar el número, mi chip. Cancelar, dar de baja el número por completo, pierde el número.
														</div>
														<div>
															<span>10:23 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:24 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															¿De acuerdo con ello?
														</div>
														<div>
															<span>10:24 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:25 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Sí, señorita.
														</div>
														<div>
															<span>10:25 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:26 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Bien, y ese número ¿Me lo brinda el número?
														</div>
														<div>
															<span>10:26 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:27 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Sí, por favor. Ya. Un momentito. Es nueve treinta y uno, cero cincuenta y uno, cinco seis cinco.
														</div>
														<div>
															<span>10:27 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:28 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Bien. ¿El número a cancelar es el nueve tres uno cero cinco uno cinco seis cinco?
														</div>
														<div>
															<span>10:28 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:29 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Sí.
														</div>
														<div>
															<span>10:29 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:30 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Bien. En caso de que hagamos la comunicación. ¿Podemos tomar el mismo número de cual llama como referencia?
														</div>
														<div>
															<span>10:30 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:31 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Sí, porque es mío también.
														</div>
														<div>
															<span>10:31 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:32 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Me indica algún motivo por el cual desea hacer la cancelación. ¿Algún tema personal, económico o solo desea cancelar?
														</div>
														<div>
															<span>10:32 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:33 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Por pérdida, señorita. Pérdida de chip.
														</div>
														<div>
															<span>10:33 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:34 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Sí, por pérdida. Bien. Solamente el chip se bloquearía. ¿Verdad?
														</div>
														<div>
															<span>10:34 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:35 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Se da de baja al número al chip, no afecta al teléfono, pero se da de baja al número, no es bloqueo. ¿Sí?
														</div>
														<div>
															<span>10:35 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:36 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Ya, sí. Por eso le indico la única siguiente información con respecto a la cancelación. Indicarle que la cancelación de la línea se realiza en un plazo que es no menor a cinco días hábiles y mayor a un mes calendario. Puede indicar la fecha en la cual desea cancelar el servicio dentro de este plazo indicado. Como está llamando el día de hoy, que es veinticinco de febrero, usted puede hacer la programación de la baja a partir de este, el cinco de marzo, hasta el veintiséis de marzo, ya que son treinta días calendarios como máximo. Diana, bajo esta información. ¿Qué día desea programar la baja de su servicio?
														</div>
														<div>
															<span>10:36 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:37 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Para por mí fuera hoy día mismo, señorita.
														</div>
														<div>
															<span>10:37 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:38 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Comprendo. Pero no es posible hoy, porque indica que ya tiene un plazo a realizarse, es un plazo no menor a cinco días hábiles, tenía un mayor mes calendario. Como estoy llamando el día de hoy, que es veinticinco de febrero, solicitándolo, calculando, usted puede indicarme una fecha para tomar la baja a partir desde el cinco de marzo hasta el veintiséis de marzo, ya que son treinta días calendarios como máximo. Puede indicar, bajo su explicación, una fecha para así hacer la programación de la baja. ¿Desde el cinco o el seis fue?
														</div>
														<div>
															<span>10:38 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:39 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Sí. ¿Cinco o seis de marzo?
														</div>
														<div>
															<span>10:39 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:40 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Sí. ¿Seis de marzo?
														</div>
														<div>
															<span>10:40 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:41 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Sí.
														</div>
														<div>
															<span>10:41 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:42 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Bien. Ahorita no validamos datos. ¿Dime, por favor, sus nombres y apellidos completos?
														</div>
														<div>
															<span>10:42 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:43 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Dianita Martínez López.
														</div>
														<div>
															<span>10:43 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:44 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															¿Qué indicaría su tipo y número de documento de identidad?
														</div>
														<div>
															<span>10:44 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:45 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															DNI cuarenta y seis, noventa y tres, seis tres cinco cinco.
														</div>
														<div>
															<span>10:45 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:46 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Bien. Contigo validamos unos datos en el sistema, Gardeny. ¿Indique, por favor, su fecha de nacimiento?
														</div>
														<div>
															<span>10:46 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:47 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Doce de febrero de mil novecientos noventa y uno.
														</div>
														<div>
															<span>10:47 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:48 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Doce de febrero de mil novecientos nueve uno. ¿Indicaría el primer nombre del padre?
														</div>
														<div>
															<span>10:48 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:49 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Juan.
														</div>
														<div>
															<span>10:49 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:50 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Juan. ¿Primer nombre de la madre?
														</div>
														<div>
															<span>10:50 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:51 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Rosa.
														</div>
														<div>
															<span>10:51 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:52 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Rosa. ¿Me indicaría el lugar de nacimiento, usted donde usted nació? ¿Departamento, provincia, distrito, departamento?
														</div>
														<div>
															<span>10:52 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:53 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															¿El mío? Sí, lugar de nacimiento donde usted nació. ¿Departamento, provincia, distrito? En mi DNI sale que yo lo saqué en La Libertad, pero yo ahora radico, o sea, en San Martín, claro, nací en San Martín. En la provincia de Tocasio, región San Martín.
														</div>
														<div>
															<span>10:53 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:54 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															¿El departamento San Martín?
														</div>
														<div>
															<span>10:54 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:55 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															San Martín. Provincia Tocache.
														</div>
														<div>
															<span>10:55 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:56 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															¿Y viejito?
														</div>
														<div>
															<span>10:56 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:57 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Tocache.
														</div>
														<div>
															<span>10:57 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:58 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Tocache. Bien, un momento en línea, por favor. Ajá. Bien, así mejor le espero confirmarme sus datos fueron validados de forma correcta. ¿Sí? Así también la compañía la ofrece como segunda opción, como indicó que lo que ha perdido es el chip, también puede ser lo que es el bloqueo de la línea, con el futuro usted puede hacer la recuperación de este o también puede ser el cambio de SIM card. O, si desea, continuamos con la cancelación de línea.
														</div>
														<div>
															<span>10:58 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 10:59 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Sí, está bien. Continuamos con la cancelación.
														</div>
														<div>
															<span>10:59 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 11:00 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Continuamos con la cancelación. ¿Correcto?
														</div>
														<div>
															<span>11:00 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 11:01 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Señorita, cancéle mi número.
														</div>
														<div>
															<span>11:01 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 11:02 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Le indico las consideraciones de cancelación de la línea. El proceso no tiene costo, le damos el servicio para ejecutar para el seis de marzo del veinte veinticinco. Le recuerdo que ejecutará la cancelación, se va a perder todos los saldos, formaciones que tuviera la línea y también se va a perder el número. En base a todo lo explicado. ¿Sería de acuerdo en realizar la cancelación?
														</div>
														<div>
															<span>11:02 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 11:03 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Sí, señorita.
														</div>
														<div>
															<span>11:03 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 11:04 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Listo. ¿Me permite solamente un momento más en línea para así con línea con el proceso? Un momento en línea, por favor. Ok. Espere un momento más en línea, por favor. Ok. Un momento más en línea, por favor, no corte la llamada. No sé. Solo un momento más en línea, por favor, no corte la llamada. Jueguen, pero no llegan, si eso lo veo. Espere un momento más en línea, por favor, reporte la llamada. Ya. Un momento más en línea, por favor. Ya. Bien, no le espé disculpe, de volada. Sí me va a indicarle que cancelación de servicio número móvil del nueve tres uno cero cinco uno cinco seis cinco. Se hace falta el día seis de marzo del veinte veinticinco. Su número de atención es el uno ocho seis seis dos uno siete seis uno. Así también su pre cancelación lo va a recibir vía mensaje de texto o por vía ¿Sí? Hasta aquí todo conforme con la información brindada. ¿Verdad?
														</div>
														<div>
															<span>11:04 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 11:05 am - Cliente (izquierda) */}
												<div className="media">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={face9} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper left user-bg">
															<span className="label-cliente">Cliente:</span>
															Sí, señorita, muchas gracias. Puede comunicarse con nosotros. Enviar recibirá una encuesta burocrática de atención. Me place excelente día, Dianita.
														</div>
														<div>
															<span>11:05 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>

												{/* 11:06 am - Bot (derecha) */}
												<div className="media flex-row-reverse">
													<div className="main-img-user avatar avatar-md">
														<img alt="" src={mainImgSrc.imgSrc} />
													</div>
													<div className="media-body">
														<div className="main-msg-wrapper right agent-bg">
															<span className="label-bot">Chat Bot:</span>
															Gracias. Ok. Hasta luego. Su opinión es muy importante para nosotros. Lo invitamos a responder una breve encuesta que recibirá vía SMS. Gracias por llamar a Bitel.
														</div>
														<div>
															<span>11:06 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
														</div>
													</div>
												</div>
											</div>
										</SimpleBar>





										{/* <div className="main-chat-footer">
											<nav className="nav">
											</nav><input className="form-control" placeholder="Type your message here..." type="text" />
											<OverlayTrigger placement='top' overlay={<Tooltip>Add Emoticons</Tooltip>}>
												<Link to="#" className="nav-link me-2"><i className="fe fe-paperclip"></i></Link>
											</OverlayTrigger>
											<Link to="#" className="main-msg-send" ><i className="fe fe-send"></i></Link>
										</div> */}
									</div>
								</div>
							</Card>
						</Col>
						<div className="col-lg-12 col-xl-12 col-xxl-3">
							<Card className="overflow-hidden">
								<div className="main-content-app">
									<SimpleBar className="card-body p-0 chat-main" id="ChatMain" >
										<Dropdown className="float-end m-4">
											<Dropdown.Toggle as="a" className="option-dots text-dark no-caret" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fe fe-more-vertical"></i></Dropdown.Toggle>
											<Dropdown.Menu>
												<Dropdown.Item><i className="fe fe-edit me-2"></i> Edit</Dropdown.Item>
												<Dropdown.Item><i className="fe fe-share me-2"></i> Share</Dropdown.Item>
												<Dropdown.Item><i className="fe fe-trash me-2"></i> Delete</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
										<div className="text-center border-bottom chat-image p-4 mb-4 mt-3">
											{/* <div className="avatar avatar-xxl  mb-3 mx-auto">
												<Link className="" to={`${import.meta.env.BASE_URL}pages/profile`}><img alt="avatar" className="rounded-circle" src={mainImgSrc.imgSrc} /></Link>
											</div> */}
											{/* <Link to={`${import.meta.env.BASE_URL}pages/profile`}><h5 className="mb-1 text-dark">{mainImgSrc.name}</h5></Link> */}
											<p className="text-muted mt-0 mb-1 pt-0 fs-13">Resumen de la conversación</p>
											<p className="text-muted mt-0 pt-0 fs-13 mb-0">+51960953104</p>
											<p className="text-justify text-muted fs-12">
												Diana Martínez López llamó a Bitel para solicitar la cancelación de un número de teléfono debido a la pérdida de su chip. Tras confirmar que era la titular de la línea, proporcionó su número de DNI y otros datos personales para validación. La agente le informó que la cancelación tomaría entre cinco días hábiles y un mes, y Diana eligió el 6 de marzo como fecha de baja. Se le ofreció la opción de bloqueo y recuperación del número, pero prefirió la cancelación definitiva. Finalmente, se confirmó la solicitud y se le proporcionó un número de atención, junto con un mensaje de pre-cancelación vía SMS.
											</p>
										</div>
										<div className="">
											<div className="px-4">
												<h6 className="mb-3">Datos</h6>
												<div className="d-flex">
													<div>
														<Link to="#" className="nav-link border rounded-pill chat-profile me-2" ><i className="fe" >😊</i></Link>
													</div>
													<div className="ms-2">
														<p className="fs-13 fw-semibold mb-0">Sentimiento</p>
														<p className="fs-12 text-muted">Positivo</p>
													</div>
												</div>
												<div className="d-flex">
													<div>
														<Link to="#" className="nav-link border rounded-pill chat-profile me-2" ><i className="fe fe-message-square"></i></Link>
													</div>
													<div className="ms-2">
														<p className="fs-13 fw-semibold mb-0">Tema</p>
														<p className="fs-12 text-muted">La cancelación de una línea telefónica</p>
													</div>
												</div>
												<div className="d-flex mt-2">
													<div>
														<Link to="#" className="nav-link border rounded-pill chat-profile me-2" ><i className="fe fe-heart"></i></Link>
													</div>
													<div className="ms-2">
														<p className="fs-13 fw-semibold mb-0">Emocion 2</p>
														<p className="fs-12 text-muted">Tranquilo</p>
													</div>
												</div>
											</div>
										</div>

										{/* Audio Player Component */}

									</SimpleBar>
								</div>
							</Card>
						</div>
					</Row>
				</Col>
			</Row>
		</Fragment>
	);
};

export default Conversaciones;
