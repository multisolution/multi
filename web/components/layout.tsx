import { FunctionComponent, PropsWithChildren } from "react";
import GlobalStyled, {Container} from "./global-styled";
import Header from "./header"

// import logo from "../public/logo.png";

type LayoutProps = {}


const Layout: FunctionComponent = (props: PropsWithChildren<LayoutProps>) => {

    return(
        <>
            <Header>
                <Container>
                   <img src="assets/img/logo.png" />
                </Container>
            </Header>

            <main role="main">
                {props.children}
            </main>

            <footer>

            </footer>
        </>
    )
}

export default Layout;