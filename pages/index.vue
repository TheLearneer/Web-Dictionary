<template>
	<div class="section">
		<!-- Title Section -->
		<section align="center">
			<h1 class="title is-1">Dictionary</h1>
		</section>
		
		<!-- Query Customization Section -->
		<form @submit.prevent="queryDictionary">
			<section class="section">
				<div class="columns">
					<div class="column is-one-third">
						<b-field>
							<b-input 
								expanded
								placeholder="Search for a word"
								type="search"
								icon="dictionary"
								v-model="query">
							</b-input>
							<p class="control">
								<b-button class="button" @click="queryDictionary">
									<b-icon	icon="magnify" />
								</b-button>
							</p>
						</b-field>
					</div>
					
					<div class="column">
						<b-field grouped position="is-right">
							<b-select placeholder="Select language" v-model="lang">
								<option
									v-for="option in languages"
									:value="option"
									:key="option">
									{{ option }}
								</option>
							</b-select>
						</b-field>
					</div>
				</div>
			</section>
		</form>
		
		<!-- Result section -->
		<section class="section" v-if="result !== null">
			<p style="font-size:26px;"><b>{{ toTitleCase(result.word) }}</b></p>
			<p>{{ result.phonetic }}</p>
			<br>
			
			<b-tabs type="is-boxed" expanded>
				<b-tab-item v-for="pos in parts" :key="pos" :label="toTitleCase(pos)">
					<div class="section">
						<ol :id=pos>
							<li v-for="entry in result.meaning[pos]">
								<p><b>{{ entry.definition }}</b></p>
								<p v-if="entry.example" class="mini">
									"{{ entry.example }}"
								</p>
								<p v-if="entry.synonyms" class="mini">
									<i><u>Synonyms:</u></i>
									{{ entry.synonyms.join(', ') }}
								</p>
								<br>
							</li>
						</ol>
					</div>
				</b-tab-item>
			</b-tabs>
		</section>
		
	</div>
</template>

<script>
export default {
	data() {
		return {
			query: null,
			lang: 'English',
			languages: [ 'English', 'Hindi', 'Spanish', 'French', 'Russian', 'German', 'Italian', 'Korean', 'Brazilian Portuguese', 'Chinese (Simplified)', 'Arabic', 'Turkish' ],
			result: null
		}
	},
	computed: {
		parts() {
			return this.result ? Object.keys(this.result.meaning) : [];
		}
	},
	methods: {
		async queryDictionary() {
			if (this.query === null || this.query.trim() === '') return;
			try {
				const data = await this.$axios.$get('https://googledictionaryapi.eu-gb.mybluemix.net', { params: { define: this.query, lang:  this.getLanguageCode() } });
				this.result = Array.isArray(data) ? data[0] : data;
			} catch(err) {
				this.result = null;
				return this.displayError(err.response.status === 404 ? 'No result Found!' : 'There is some Error, Please Contact the author!');
			}
		},
		displayError(message) {
			return this.$buefy.toast.open({
				message,
				type: 'is-danger'
			})
		},
		getLanguageCode() {
			switch (this.lang.toLowerCase()) {
				case 'english':	return 'en';
				case 'hindi': return 'hi';
				case 'spanish': return 'es';
				case 'french': return 'fr';
				case 'russian': return 'ru';
				case 'german': return 'de';
				case 'italian': return 'it';
				case 'korean': return 'ko';
				case 'brazilian portuguese': return 'pt-BR';
				case 'chinese (simplified)': return 'zh-CN';
				case 'arabic': return 'ar';
				case 'turkish': return 'tr';
			}
		},
		toTitleCase(term) {
			const sliced = term.split('');
			sliced[0] = sliced[0].toUpperCase();
			return sliced.join('');
		}
	}
}
</script>

<style>
.mini {
	color:#878787;
	font-size:14px;
}
</style>