import { Box, Button, Text, TextField, Image, Icon } from '@skynexui/components'; 
import { useState } from 'react';
import appConfig from '../config.json';

function GlobalStyle() {
    return (
        <style global jsx>
            {`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    list-style: none;
                }

                body {
                    font-family: 'Open Sans', sans-serif;
                }

                html, body, #__next {
                    min-height: 100vh;
                    display: flex;
                    flex: 1;
                }

                #__next {
                    flex: 1;
                }
                
                #__next > * {
                    flex: 1;
                }
            `}
        </style>
    )
}

function Title(props) {
    const Tag = props.tag || 'h1';

    return (
      <>
        <Tag>{props.children}</Tag>
        <style jsx>
            {`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}
        </style>
      </>
    );
}

// function HomePage() {
//     return (
//         <div>
//             <GlobalStyle />
//             <Title>Boas vindas de volta!</Title>
//             <Title tag="h2">Discord - Game center</Title>
//         </div>

//     )
// }
  
// export default HomePage

export default function PaginaInicial() {
    const [username, setUsername] = useState('erick-menezes');
  
    return (
      <>
        <GlobalStyle />
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundImage: 'url(https://www.nawpic.com/media/2020/genshin-impact-nawpic-10-scaled.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Title tag="h2">Boas vindas de volta!</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
  
              <TextField
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
                {
                    username ? (
                        <>
                            <Image
                                styleSheet={{
                                    borderRadius: '50%',
                                    marginBottom: '16px',
                                }}
                                src={`https://github.com/${username}.png`}
                            />
                            <Text
                                variant="body4"
                                styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                                }}
                            >
                                {username}
                            </Text>
                        </>
                    ) : (
                        <Icon 
                            label="Icon Component" 
                            name="FaUser" 
                            size={100} 
                            styleSheet={{
                                marginBottom: '16px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    )
                }
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
}