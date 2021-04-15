
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
const list = [
    `id`, `transaction_hash_id`, `vout`, `name`, `claim_id`, `claim_type`, `publisher_id`, `publisher_sig`, `certificate`, `sd_hash`, `transaction_time`, `version`, `value_as_hex`, `value_as_json`, `valid_at_height`, `height`, `effective_amount`, `author`, `description`, `content_type`, `is_nsfw`, `language`, `thumbnail_url`, `title`, `fee`, `fee_currency`, `fee_address`, `is_filtered`, `bid_state`, `created_at`, `modified_at`, `claim_address`, `is_cert_valid`, `is_cert_processed`, `license`, `license_url`, `preview`, `type`, `release_time`, `source_hash`, `source_name`, `source_size`, `source_media_type`, `source_url`, `frame_width`, `frame_height`, `duration`, `audio_duration`, `os`, `email`, `website_url`, `has_claim_list`, `claim_reference`, `list_type`, `claim_id_list`, `country`, `state`, `city`, `code`, `latitude`, `longitude`
];
console.log(list);


ready(() => {
    let data = null;
    let btnQuery = document.querySelector('button#sendQ');
    let btnSave = document.querySelector('button#downloadQ');
    var editor = CodeMirror.fromTextArea(document.querySelector('textarea'), {
        theme:'dracula',
        maxHighlightLength:10000000000,
        lineNumbers: true,
        mode:'javascript'
      });
    function download(content, mimeType, filename) {
        var a = document.createElement('a')
        var blob = new Blob([content], { type: mimeType })
        var url = URL.createObjectURL(blob)
        a.setAttribute('href', url)
        a.setAttribute('download', filename)
        a.click()
    }
    document.querySelector('input[type="search"]').value = localStorage.getItem('query') || "";
    btnQuery.addEventListener('click', () => {
        let s = document.querySelector('input[type="search"]');
        // conso
        localStorage.setItem('query', s.value)
        if (!!s.value) {
            fetch(`https://chainquery.lbry.com/api/sql?query=${encodeURIComponent(s.value)}`)
                .then(r => r.json())
                .then(r => {
                    console.log(r);
                    data = r;
                    console.log(editor);
                    editor.setValue(JSON.stringify(data, null, 2));
                })

        }
    })
    btnSave.addEventListener('click', () => {
        if (!!data) {
            download(JSON.stringify(data), 'application/json', `query-${new Date().getTime()}.json`);
            data = null;
        } else {
            alert(`Data is ${data}`);
        }

    })
})
