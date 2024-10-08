import { Box, Button, Text, TextField, Image, Icon } from '@skynexui/components'; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

import { supabaseClient } from '../apis/supabase/client';

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

export default function PaginaInicial() {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
      checkUser();
    }, []);
    
    // Ver se o usuário está logado ou não
    const signInWithGithub = async () => {
      try {
        setLoading(true);
        await supabaseClient.auth.signIn({
          provider: 'github', 
        });
      } catch (e) {
        console.log('error', e);
      } finally {
        setLoading(false);
      }

      // localStorage.setItem('github_user', username);
      // router.push(`/chat?username=${username}`);
    }

    const checkUser = async () => {
      const user = supabaseClient.auth.user();

      console.log('userrr', user);
    }

    return (
      <>
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
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Title tag="h2">Seja bem-vindo!</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
  
              {/* <TextField
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
                disabled={username.length < 3}
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: username.length < 3 ? appConfig.theme.colors.neutrals['800'] : appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: username.length < 3 ? '' : appConfig.theme.colors.primary[600],
                }}
              /> */}
              <Button 
                onClick={signInWithGithub}
                label={!loading ? "Entrar com GitHub" : "Logando..."}
                size="xl"
                iconName="github"
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.neutrals[999],
                }}
                disabled={loading}
                styleSheet={{
                  fontWeight: 800,
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
                    username.length > 2 ? (
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