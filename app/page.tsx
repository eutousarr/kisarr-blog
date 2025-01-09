import ContentForm from '@/components/content-form'

export default function Home() {
  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>Write a blog</h1>

        <ContentForm />
<br /><hr /><br />
        <video width='320' height='240' controls preload='none'>
          <source src='' type='video/mp4' />
          <track
            src='/path/to/captions.vtt'
            kind='subtitles'
            srcLang='en'
            label='English'
          />
          Your browser does not support the video tag.
        </video>
        <iframe src="https://youtube.com/live/dDJst_dImho" allowFullScreen />
        <iframe src="https://youtube.com/live/dDJst_dImho?feature=share" allowFullScreen />

      </div>
    </section>
  )
}
