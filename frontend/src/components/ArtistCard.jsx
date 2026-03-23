function ArtistCard({ artist }) {
  return (
    <article className="artist-card">
      <h4>{artist.stage_name}</h4>
      <p>{artist.country || 'Unknown Country'}</p>
      <small>{artist.verified ? 'Verified' : 'Artist'}</small>
    </article>
  )
}

export default ArtistCard
