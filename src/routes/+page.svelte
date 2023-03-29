<script>
  import { answers } from '../lib/store/Store';
  import UserInput from "../components/UserInput.svelte";
  import BottomBar from "../components/BottomBar.svelte";
  import Logo from "../components/Logo.svelte";
  import AnswerSection from "../components/AnswerSection.svelte";
</script>

<style>
  main {
      padding-bottom: 4rem; 
  }
</style>

<main>
  <Logo />
  <UserInput />
  {#if $answers.steps}
    <AnswerSection />
  {/if}
</main>
<BottomBar />