export default function Error({ message }: { message: string }) {
    return <div className="text-red-600 text-center py-4">{message}</div>
  }