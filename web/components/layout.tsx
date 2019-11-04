import { FunctionComponent, PropsWithChildren } from "react";
import GlobalStyled, {Container} from "./global-styled";
import Header from "./header"

type LayoutProps = {}

const Layout: FunctionComponent = (props: PropsWithChildren<LayoutProps>) => {
    return(
        <>
            <Header>
                <Container>
                    <h1>HEADER</h1>
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