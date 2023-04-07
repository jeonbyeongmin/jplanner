import { GetServerSideProps } from 'next'

interface PlannerDetailProps {
  plannerID: string
}

export default function PlannerDetail({ plannerID }: PlannerDetailProps) {
  return <div>{plannerID}</div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context

  return {
    props: {
      plannerID: params?.id,
    },
  }
}
