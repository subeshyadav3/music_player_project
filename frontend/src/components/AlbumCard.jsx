function AlbumCard({ album }) {
  return (
    <article className="album-card">
      <h4>{album.title}</h4>
      <p>{album.artist_name || 'Unknown Artist'}</p>
      <small>{album.visibility}</small>
    </article>
  )
}

export default AlbumCard
