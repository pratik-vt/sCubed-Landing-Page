import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Container from "../components/Container"



const IndexPage: React.FC<PageProps> = () => {
  return (
    <Container>
     <div> Welcome to S Cubed </div>
    </Container>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
