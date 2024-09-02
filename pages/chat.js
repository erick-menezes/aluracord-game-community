import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import appConfig from '../config.json';

// import { insertListener, deleteListener, supabaseClient } from '../apis/supabase/client';

import { supabaseClient, listener } from '../apis/supabase/client';

import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const router = useRouter();

    let xPos, yPos;

    useEffect(() => {
        redirectUser();
        getMessages();
        listener(insertAction, deleteAction);

        document.addEventListener("contextmenu", handleContextMenu);

        return () => document.removeEventListener("contextmenu", handleContextMenu);
    }, []);

    useEffect(() => {
        checkDuplicateMessages();
    }, [listaDeMensagens]);

    const handleContextMenu = (event) => {
        event.preventDefault();
        xPos = event.pageX + "px";
        yPos = event.pageY + "px";
        console.log('position X: ', xPos);
        console.log('position Y: ', yPos);
    }

    const insertAction = (mensagem) => {
        setListaDeMensagens(valorAtualDaLista => {
            return [
                mensagem,
                ...valorAtualDaLista
            ]
        });
    }

    const checkDuplicateMessages = () => {
        setTimeout(() => {
            const messageListFilter = listaDeMensagens.filter(msg => !msg.id)[0];
            const duplicateIndex = listaDeMensagens.findIndex(mensagem => mensagem === messageListFilter);
            const newMessageList = [...listaDeMensagens];

            if (duplicateIndex !== -1) {
                newMessageList.splice(duplicateIndex, 1);
                setListaDeMensagens(newMessageList);
            }
        }, 300);
    }

    const deleteAction = (mensagem) => {
        const newList = listaDeMensagens.filter(msg => msg.id !== mensagem.id);
        setListaDeMensagens(newList);
    };

    const getMessages = () => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setListaDeMensagens(data);
            })
    }

    function handleNovaMensagem(novaMensagem) {
        const { username } = router.query;

        const mensagem = {
            de: username,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem,
            ])
            .then(({ data }) => {
                console.log('data', data[0]);
            })

        setMensagem('');
        setListaDeMensagens(valorAtualDaLista => {
            return [
                mensagem,
                ...valorAtualDaLista
            ]
        });
    }

    function redirectUser() {
        if (!router.query.username && !localStorage.getItem('github_user')) {
            router.push('/');
        }
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: 'url(https://www.nawpic.com/media/2020/genshin-impact-nawpic-10-scaled.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} />
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                setMensagem(event.target.value);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <ButtonSendSticker onStickerClick={(sticker) => {
                            handleNovaMensagem(':sticker: ' + sticker);
                        }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date(mensagem.created_at).toLocaleDateString())}
                            </Text>
                        </Box>
                        {
                            mensagem.texto.startsWith(':sticker:') ? (
                                <Image src={mensagem.texto.replace(':sticker:', '')} />
                            ) : (
                                mensagem.texto
                            )
                        } 
                    </Text>
                );
            })}
        </Box>
    )
}