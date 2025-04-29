

import {
    Box,
    FooterContainer,
    Row,
    Column,
    FooterLink,
    Heading,
} from './style.module.ts'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
const Footer = () => (
    <Box>
        <h3
            style={{
                color: "green",
                textAlign: "center",
                marginTop: "10px",
            }}
        >
            P2Win
        </h3>
        <FooterContainer>
            <Row>
                <Column>
                    <Heading>Sobre nós</Heading>
                    <FooterLink href="#">
                        Termos de uso
                    </FooterLink>
                    <FooterLink href="#">
                        Política de privacidade
                    </FooterLink>
                    <FooterLink href="#">
                        Entre em contato
                    </FooterLink>
                </Column>
               
                <Column>
                    <Heading>Redes sociais</Heading>
                    <FooterLink href="#">
                        <FaFacebook />
                        <span
                            style={{
                                marginLeft: "10px",
                            }}
                        >
                            Facebook
                        </span>

                    </FooterLink>
                    <FooterLink href="#">
                        <FaInstagram />
                        <span
                            style={{
                                marginLeft: "10px",
                            }}
                        >
                            Instagram
                        </span>

                    </FooterLink>
                    <FooterLink href="#">
                    <FaTwitter />
                            <span
                                style={{
                                    marginLeft: "10px",
                                }}
                            >
                                Twitter
                            </span>
                         
                    </FooterLink>
                    
                </Column>
            </Row>
        </FooterContainer>
    </Box>
)
export default Footer