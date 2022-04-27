import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import type { GetServerSideProps, NextPage } from 'next'
import { useMeQuery } from '../../graphql/generated/graphql'
import { getServerPageGetProducts, ssrGetProducts } from '../../graphql/generated/page'
import { withApollo } from '../../lib/withApollo'

const Home: NextPage = () => {
  const { user } = useUser()
  const { data: me } = useMeQuery()

  return (
    <div className="text-violet-500">
      <h1>Hello World</h1>
      <pre>
        {JSON.stringify(me)}
      </pre>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>

      <a href='/api/auth/logout'>Logout</a>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return {
      props: {}
    }
    // return getServerPageGetProducts({}, ctx)
  }
})

export default withApollo(
  ssrGetProducts.withPage()(Home)
)