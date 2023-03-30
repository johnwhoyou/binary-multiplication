<script>
  import { penPaper, booths, boothsExt, seqCircuit } from '../lib/store/Store';
  import UserInput from "../components/UserInput.svelte";
  import BottomBar from "../components/BottomBar.svelte";
  import Logo from "../components/Logo.svelte";
  import AnswerSection from "../components/AnswerSection.svelte";

  let stepsExist = {};
  $: {
    // If penPaper is not empty it means all algorithms have a value
    stepsExist = Object.keys($penPaper).length === 0 ? false : true;
  }
</script>

<style>
  main {
      padding-bottom: 4rem; 
  }
</style>

<main>
  <Logo />
  <UserInput />
  {#if stepsExist}
    <AnswerSection />
  {/if}
</main>
<BottomBar />