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
														color: #FFF; /* Morado */
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
															Buenos días, señorita. Soy una señora Diana Martínez López.
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
															Diana, buenos días. Dígame, permítame que desea realizar la migración de plan o cancelación en la línea.
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
															Quiero cancelar el número, mi chip. Cancelar, dar de baja el número por completo, pierde el número.
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
															¿De acuerdo con ello?
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
															Sí, señorita.
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
															Bien, y ese número ¿Me lo brinda el número?
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
															Sí, por favor. Ya. Un momentito. Es nueve treinta y uno, cero cincuenta y uno, cinco seis cinco.
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
															Bien. ¿El número a cancelar es el nueve tres uno cero cinco uno cinco seis cinco?
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
															Sí.
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
															Bien. En caso de que hagamos la comunicación. ¿Podemos tomar el mismo número de cual llama como referencia?
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
															Sí, porque es mío también.
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
															Me indica algún motivo por el cual desea hacer la cancelación. ¿Algún tema personal, económico o solo desea cancelar?
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
															Por pérdida, señorita. Pérdida de chip.
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
															Sí, por pérdida. Bien. Solamente el chip se bloquearía. ¿Verdad?
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
															Se da de baja al número al chip, no afecta al teléfono, pero se da de baja al número, no es bloqueo. ¿Sí?
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
															Ya, sí. Por eso le indico la única siguiente información con respecto a la cancelación...
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
															Para por mí fuera hoy día mismo, señorita.
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
															Comprendo. Pero no es posible hoy, porque indica que ya tiene un plazo a realizarse...
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
															Sí. ¿Cinco o seis de marzo?
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
															Sí. ¿Seis de marzo?
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
															Sí.
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
															Bien. Ahorita no validamos datos. ¿Dime, por favor, sus nombres y apellidos completos?
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
															Dianita Martínez López.
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
															¿Qué indicaría su tipo y número de documento de identidad?
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
															DNI cuarenta y seis, noventa y tres, seis tres cinco cinco.
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
															Bien. Contigo validamos unos datos en el sistema, Gardeny. ¿Indique, por favor, su fecha de nacimiento?
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
															Doce de febrero de mil novecientos noventa y uno.
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
															Doce de febrero de mil novecientos nueve uno. ¿Indicaría el primer nombre del padre?
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
															Juan.
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
															Juan. ¿Primer nombre de la madre?
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
															Rosa.
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
															Rosa. ¿Me indicaría el lugar de nacimiento, usted donde usted nació? ¿Departamento, provincia, distrito, departamento?
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
															¿El mío? Sí, lugar de nacimiento donde usted nació. ¿Departamento, provincia, distrito?
															En mi DNI sale que yo lo saqué en La Libertad, pero yo ahora radico, o sea, en San Martín...
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
															¿El departamento San Martín?
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
															San Martín. Provincia Tocache.
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
															¿Y distrito?
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
															Tocache.
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
															Tocache. Bien, un momento en línea, por favor...
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
															Sí, está bien. Continuamos con la cancelación.
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
															Continuamos con la cancelación. ¿Correcto?
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
															Señorita, cancéle mi mi número.
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
															Le indico las consideraciones de cancelación de la línea. El proceso no tiene costo...
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
															Sí, señorita.
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
															Listo. ¿Me permite solamente un momento más en línea para así continuar con el proceso? Un momento, por favor.
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
															Sí, señorita, muchas gracias.
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
															Gracias. Ok. Hasta luego. Su opinión es muy importante para nosotros...
														</div>
														<div>
															<span>10:46 am</span> <Link to="#"><i className="icon ion-android-more-horizontal"></i></Link>
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
														<Link to="#" className="nav-link border rounded-pill chat-profile me-2" ><i className="fe fe-smile"></i></Link>
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
